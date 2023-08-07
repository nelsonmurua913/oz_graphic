"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Timer from "./timer";
import { getSecondsFromString } from "../../utils/formatTime";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, { transports: ['websocket'] });

const Stats = () => {

    const [matchId, setMatchId] = useState(149257);
    const [teamName1, setTeamName1] = useState("team 1");
    const [teamName2, setTeamName2] = useState("team 2");
    const [teamLogo1, setTeamLogo1] = useState("");
    const [teamLogo2, setTeamLogo2] = useState("");
    const [teamId1, setTeamId1] = useState("");
    const [teamId2, setTeamId2] = useState("");
    const [goal1, setGoal1] = useState(0);
    const [goal2, setGoal2] = useState(0);
    const [yellowCard1, setYellowCard1] = useState(0);
    const [yellowCard2, setYellowCard2] = useState(0);
    const [redCard1, setRedCard1] = useState(0);
    const [redCard2, setRedCard2] = useState(0);
    const [status, setStatus] = useState('waiting for start');
    const [period, setPeriod] = useState(1);
    const [periodType, setPeriodType] = useState('regular');
    const [clock, setClock] = useState(0);
    const [actions, setActions] = useState<TAction[]>([]);

    useEffect(() => {
        socket.on("match-info", (data) => {
            setMatchId(data.matchId);
            if (data.matchData.type === 'TEAM-INFO') {
                const team = data.matchData.data;
                if (team.teamNumber === 1) {
                    setTeamName1(team.teamName);
                    setTeamLogo1(team.teamLogo.S1.url);
                    setTeamId1(team.teamId);
                } else {
                    setTeamName2(team.teamName);
                    setTeamLogo2(team.teamLogo.S1.url);
                    setTeamId2(team.teamId);
                }
            }
            if (data.matchData.type === 'GOAL-INFO') {
                const goal = data.matchData.data;
                const action: TAction = {
                    type: 'GOAL',
                    teamNumber: goal.teamNumber,
                    playerNumber: goal.playerNumber,
                    clock: goal.clock,
                    subType: goal.subType,
                };
                actions.push(action);
                setActions([...actions]);
                console.log(goal);
                if (goal.teamNumber === 1) {
                    setGoal1(goal1 + 1);
                } else {
                    setGoal2(goal2 + 1);
                }
            }
            if (data.matchData.type === 'SUBSTITUTION-INFO') {
                const substitution = data.matchData.data;
                const action: TAction = {
                    type: 'SUBSTITUTION',
                    teamNumber: substitution.teamNumber,
                    playerNumber: substitution.playerNumber,
                    clock: substitution.clock,
                    subType: substitution.subType,
                };
                actions.push(action);
                setActions([...actions]);
                console.log(substitution);
            }
            if (data.matchData.type === 'CARDS-INFO') {
                const card = data.matchData.data;
                const action: TAction = {
                    type: card.actionType,
                    teamNumber: card.teamNumber,
                    playerNumber: card.playerNumber,
                    clock: card.clock,
                    subType: card.subType,
                };
                actions.push(action);
                setActions([...actions]);
                console.log(card);
                if (card.actionType === 'cardyellow') {
                    if (card.teamNumber === 1) {
                        setYellowCard1(yellowCard1 + 1);
                    } else {
                        setYellowCard2(yellowCard2 + 1);
                    }
                } else if (card.actionType === 'cardred') {
                    if (card.teamNumber === 1) {
                        setRedCard1(redCard1 + 1);
                    } else {
                        setRedCard2(redCard2 + 1);
                    }
                }
            }
            if (data.matchData.type === 'STATUS-INFO') {
                const status = data.matchData.data;
                setStatus(status.status);
                setPeriod(status.period.current);
                setPeriodType(status.period.periodType);
                setClock(getSecondsFromString(status.clock));
            }
        });
    }, [socket]);


    return (
        <div className="main relative mt-10">
            <div className="text-red-500 w-full flex justify-center">
                <div className="bg-main text-white w-[200px] text-center rounded-t-md h-[10px]"></div>
            </div>
            <div className="flex justify-center">
                <div className="bg-main w-[800px] px-10 pt-1 flex flex-col space-y-8">
                    <div>
                        <h1 className="text-blue-400 w-full text-center">Stats {matchId}</h1>
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                        <div className="col-span-2 grid grid-rows-3 gap-1">
                            <div className="row-span-3 bg-color1 text-yellow-100 px-6 w-full text-lg text-center py-1 rounded-md">{teamName1}</div>
                            <div className="row-span-2 bg-color1 w-full text-center">TeamId - {teamId1}</div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-color1 w-full h-full rounded-lg flex items-center justify-center">
                                <Image src={teamLogo1} alt="teamLogo1" width={100} height={100} />
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-rows-5 gap-1">
                            <div className="row-span-3 bg-color1 text-yellow-100 px-6 w-full text-lg py-1 rounded-md text-center">
                                <Timer status={status} clock={clock} />
                            </div>
                            <div className="row-span-2 bg-color1 w-full text-center text-yellow-100">{periodType} : {period === 1 ? 'FirstHalf' : 'SecondHalf'}</div>
                            <div className="row-span-2 bg-color1 w-full text-center text-yellow-100">{status}</div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-color1 w-full h-full rounded-lg flex items-center justify-center">
                                <Image src={teamLogo2} alt="teamLogo2" width={100} height={100} />
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-rows-3 gap-1">
                            <div className="row-span-3 bg-color1 text-yellow-100 px-6 w-full text-lg text-center py-1 rounded-md">{teamName2}</div>
                            <div className="row-span-2 bg-color1 text-center w-full">TeamId - {teamId2}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-11 gap-2">
                        <div className="col-span-2 grid grid-rows-5">
                            <div className="row-span-1 text-blue-400 text-lg flex items-center justify-center">
                                <span>HOME</span>
                            </div>
                            <div className="row-span-4 text-xl bg-color1 flex items-center justify-center text-yellow-100">
                                <span>{goal1}</span>
                            </div>
                        </div>
                        <div className="col-span-1 grid grid-rows-[9] gap-1">
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">49%</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">4</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">10</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">1</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">1</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">1</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">{yellowCard1}/{redCard1}</div>
                        </div>
                        <div className="col-span-5 grid grid-rows-[9] gap-1">
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Ball Possession</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Shots on Target</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Shots</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Fouls</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Offsides</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Corner Kicks</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-center px-1 text-sm">Yellow/Red Cards</div>
                        </div>
                        <div className="col-span-1 grid grid-rows-[9] gap-1">
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">51%</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">10</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">15</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">1</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">1</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">1</div>
                            <div className="text-yellow-100 bg-color1 rounded-md w-full text-right px-1 text-sm">{yellowCard2}/{redCard2}</div>
                        </div>
                        <div className="col-span-2 grid grid-rows-5">
                            <div className="row-span-1 text-blue-400 text-lg flex items-center justify-center">
                                <span>AWAY</span>
                            </div>
                            <div className="row-span-4 text-xl bg-color1 flex items-center justify-center text-yellow-100">
                                <span>{goal2}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-10 gap-2 text-white">
                        <div className="col-span-4 bg-color1 gap-1">
                            {actions.map((action, index) => {
                                return action.teamNumber === 1 && (
                                    <div className="flex gap-1" key={index}>
                                        <div className="">{action.type}</div>
                                        <div className="">{action.clock}</div>
                                        <div className="">{action.playerNumber}</div>
                                        <div className="">{action.subType}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-span-2 bg-color1 gap-1">
                            
                        </div>
                        <div className="col-span-4 bg-color1 gap-1">
                            {actions.map((action, index) => {
                                return action.teamNumber === 2 && (
                                    <div className="flex gap-1" key={index}>
                                        <div className="">{action.type}</div>
                                        <div className="">{action.clock}</div>
                                        <div className="">{action.playerNumber}</div>
                                        <div className="">{action.subType}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
