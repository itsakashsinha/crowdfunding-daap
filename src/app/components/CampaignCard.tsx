// import { getContract } from "thirdweb";
// import { client } from "../client";
// import { sepolia } from "thirdweb/chains";
// import { useReadContract } from "thirdweb/react";
// import Link from "next/link";


// type CampaignCardProps = {
//     campaignAddress: string;
// };

// export default function CampaignCard({ campaignAddress }: CampaignCardProps) {
//     const contract = getContract({
//         client: client,
//         chain: sepolia,
//         address: campaignAddress,
//     });

//     const { data: campaignName } = useReadContract({
//         contract,
//         method: "function name() view returns (string)",
//         params: [],
//     });

//     const { data: campaignDescription } = useReadContract({
//         contract,
//         method: "function description() view returns (string)",
//         params: [],
//     });

//     const { data: goal, isPending: isPendingGoal } = useReadContract({
//         contract,
//         method: "function goal() view returns (uint256)",
//         params: [],
//     });

//     const { data: balance, isPending: isPendingBalance } = useReadContract({
//         contract,
//         method:
//             "function getContractBalance() view returns (uint256)",
//         params: [],
//     });

//     const { data: deadline, isPending: isPendingDeadline } = useReadContract({
//         contract,
//         method: "function deadline() view returns (uint256)",
//         params: [],
//       });

//     const totalBalance = balance?.toString();
//     const totalGoal = goal?.toString();
//     let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

//     if (balancePercentage >= 100) {
//         balancePercentage = 100;
//     }

//     return (
//         <div className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 round-lg rounded-lg shadow transition-transform transform-gpu hover:-translate-y-1 hover:shadow-xl">
//             <div>
//                 {!isPendingBalance && !isPendingGoal && (
//                     <div className="mb-4">
//                         <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
//                             <div className="h-6 bg-blue-600 rounded-full dark: bg-blue-600 text-right" style={{ width: `${balancePercentage?.toString()}%` }}>
//                                 <p className="text-white dark:text-white text-xs p-1">${balance?.toString()}</p>
//                             </div>
//                             <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1"></p>
//                             {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
//                         </div>
//                     </div>
//                 )}
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight">{campaignName}</h5>
//                 <p className="mb-3 font-normal text-grey-700 dark:text-gray-400">{campaignDescription}</p>
//             </div>
//             <Link
//                 href={`/campaign/${campaignAddress}`}
//                 passHref={true}
//             >
//                 <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
//                     View Campaign &nbsp;
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="20"
//                         height="30"
//                         viewBox="0 0 24 24"
//                     >
//                         <path fill="#ffff" d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
//                     </svg>
//                 </p>

//             </Link>
//         </div>
//     );
// }


// better UI alog with the failed, success and active campaign status
import { getContract } from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type CampaignCardProps = {
    campaignAddress: string;
};

export default function CampaignCard({ campaignAddress }: CampaignCardProps) {
    const contract = getContract({
        client: client,
        chain: sepolia,
        address: campaignAddress,
    });

    const { data: campaignName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
    });

    const { data: campaignDescription } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });

    const { data: goal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });

    const { data: balance } = useReadContract({
        contract,
        method: "function getContractBalance() view returns (uint256)",
        params: [],
    });

    const { data: deadline } = useReadContract({
        contract,
        method: "function deadline() view returns (uint256)",
        params: [],
    });

    const [isExpired, setIsExpired] = useState(false);
    const [isGoalMet, setIsGoalMet] = useState(false);

    useEffect(() => {
        if (deadline) {
            const currentTime = Math.floor(Date.now() / 1000);
            setIsExpired(currentTime > Number(deadline));
        }
        if (balance && goal) {
            setIsGoalMet(Number(balance) >= Number(goal));
        }
    }, [deadline, balance, goal]);

    const totalBalance = balance?.toString() || "0";
    const totalGoal = goal?.toString() || "1";
    let balancePercentage = (parseInt(totalBalance) / parseInt(totalGoal)) * 100;
    balancePercentage = Math.min(balancePercentage, 100);

    // Determine card color based on status
    // const getCardColor = () => {
    //     if (isExpired && !isGoalMet) return "bg-red-50 border-red-200";
    //     if (isGoalMet) return "bg-green-50 border-green-200";
    //     return "bg-white border-slate-200";
    // };

    // Enhanced card colors with transparency
    const getCardColor = () => {
        if (isExpired && !isGoalMet) return "bg-red-100/40 border-red-200/60 shadow-red-100/20";
        if (isGoalMet) return "bg-green-100/40 border-green-200/60 shadow-green-100/20";
        return "bg-white/50 border-slate-200/60 shadow-slate-100/20";
    };

    // Determine progress bar color based on status
    // const getProgressColor = () => {
    //     if (isExpired && !isGoalMet) return "bg-red-600";
    //     if (isGoalMet) return "bg-green-600";
    //     return "bg-blue-600";
    // };

    // Enhanced progress bar colors with transparency
    const getProgressColor = () => {
        if (isExpired && !isGoalMet) return "bg-red-500/90";
        if (isGoalMet) return "bg-green-500/90";
        return "bg-blue-500/90";
    };


    // return (
    //     <div className={`flex flex-col justify-between max-w-sm p-6 border rounded-lg shadow transition-transform transform-gpu hover:-translate-y-1 hover:shadow-xl ${getCardColor()}`}>
    //         <div>
    //             <div className="mb-4">
    //                 <div className="relative w-full h-6 bg-gray-200 rounded-full">
    //                     <div
    //                         className={`h-6 rounded-full text-right ${getProgressColor()}`}
    //                         style={{ width: `${balancePercentage}%` }}
    //                     >
    //                         {/* <p className="text-white text-xs p-1">
    //                             {balance?.toString()} ETH
    //                         </p> */}
    //                     </div>
    //                     <p className="absolute top-0 right-0 text-gray-700 text-xs p-1">
    //                         {balancePercentage < 100 ? `${balancePercentage.toFixed(1)}%` : "100%"}
    //                     </p>
    //                 </div>
    //                 <p className="text-sm text-gray-500 mt-1">
    //                     <p className="text-gray-600 text-xs p-1">
    //                         {balance?.toString()} ETH
    //                     </p>
    //                     Goal: {goal?.toString()} $ • {isExpired ? "Ended" : "Active"}
    //                 </p>
    //             </div>
    //             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{campaignName}</h5>
    //             <p className="mb-3 font-normal text-gray-700 line-clamp-2">{campaignDescription}</p>
    //         </div>
    //         <Link
    //             href={`/campaign/${campaignAddress}`}
    //             passHref
    //             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
    //         >
    //             View Campaign &nbsp;
    //             <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="20"
    //                 height="30"
    //                 viewBox="0 0 24 24"
    //             >
    //                 <path fill="#ffff" d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
    //             </svg>
    //         </Link>
    //     </div>
    // );

    return (
        <div className={`flex flex-col justify-between max-w-sm p-6 rounded-xl shadow-lg transition-all transform-gpu hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm ${getCardColor()}`}>
            {/* Glass effect container */}
            <div className="bg-white/20 p-4 rounded-lg mb-4 border border-white/20">
                <div className="mb-4">
                    <div className="relative w-full h-6 bg-gray-200/50 rounded-full">
                        <div
                            className={`h-6 rounded-full ${getProgressColor()} transition-all duration-500 ease-out`}
                            style={{ width: `${balancePercentage}%` }}
                        >
                            <span className="absolute right-2 text-gray-400 text-xs font-medium">
                                {balancePercentage >= 5 ? `${balancePercentage.toFixed(1)}%` : ''}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-600 font-medium">
                            Raised: {balance?.toString()} ETH(Wei)
                        </span>
                        <span className="text-gray-600">
                            Goal: {goal?.toString()} ETH(Wei)
                        </span>
                    </div>
                    <div className="mt-1 text-xs font-medium">
                        <span className={`px-2 py-1 rounded-full ${isExpired ? 'bg-red-500/20 text-red-700' : 'bg-blue-500/20 text-blue-700'}`}>
                            {isExpired ? (isGoalMet ? 'Successfully Funded' : 'Funding Expired') : 'Active'}
                        </span>
                    </div>
                </div>
                
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">{campaignName}</h5>
                <p className="mb-3 font-normal text-gray-700 line-clamp-3">{campaignDescription}</p>
            </div>
            
            <Link
                href={`/campaign/${campaignAddress}`}
                passHref
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600/90 rounded-lg hover:bg-blue-700/90 transition-colors border border-white/20 shadow-md"
            >
                View Campaign
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                >
                    <path fill="currentColor" d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                </svg>
            </Link>
        </div>
    );
}



