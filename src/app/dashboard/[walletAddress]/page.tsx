'use client';
import { client } from "@/app/client";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "@/app/constants/contracts";
import { useActiveAccount, useReadContract, useSendTransaction  } from "thirdweb/react";
import CampaignCard from "@/app/components/CampaignCard";
import { useState } from "react";
import { deployPublishedContract } from "thirdweb/deploys";

export default function DashboardPage() {
    const account = useActiveAccount();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: CROWDFUNDING_FACTORY,
    });

    const { data, isPending, refetch  } = useReadContract({
        contract,
        method:
            "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [account?.address as string],
    });
    return (
        <div className="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-between items-center mb-8">
                <p className="text-4xl font-semibold">Dashboard</p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => setIsModalOpen(true)}
                >Create Campaign</button>
            </div>
            <p className="text-2xl font-semibold mb-4">My Campaigns:</p>
            <div className="grid grid-cols-3">
                {!isPending && data && (
                    data.length > 0 ? (
                        data.map((campaign, index) => (
                            <CampaignCard
                                key={index}
                                campaignAddress={campaign.campaignAddress}
                            />
                        ))
                    ) : (
                        <p>No campaign found</p>
                    )
                )}
            </div>
            {isModalOpen && (
                <CreateCampaignModal
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                />
            )}
        </div>
    )
}

type CreateCampaignModalProps = {
    setIsModalOpen: (value: boolean) => void
    refetch: () => void
};

const CreateCampaignModal = ({ setIsModalOpen, refetch }: CreateCampaignModalProps) => {
    const account = useActiveAccount();
    const [campaignName, setcampaignName] = useState<string>('');
    const [campaignDescription, setCampaignDescription] = useState<string>('');
    const [campaignGoal, setCampaignGoal] = useState<number>(1);
    const [campaignDeadline, setCampaignDeadline] = useState<number>(1);
    const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: CROWDFUNDING_FACTORY,
    });


    // const handleDeployContract = async () => {
    //     if (!account) {
    //         alert("Please connect your wallet first.");
    //         return;
    //     }

    //     setIsDeployingContract(true);
    //     try {
    //         console.log("Deploying contract...");
    //         const contractAddress = prepareContractCall({
    //             contract,
    //             method:
    //               "function createCampaign(string _name, string _description, uint256 _goal, uint256 _durationInDays)",
    //             params: [campaignName, campaignDescription,BigInt(campaignGoal),BigInt(campaignDeadline)],
    //           });
    //         alert('Campaign created successfully!');
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setIsDeployingContract(false);
    //         setIsModalOpen(false);
    //         refetch();
    //     }
    // };

    

    // const handleDeployContract = async () => {
    //     setIsDeployingContract(true);
    //     try {
    //         console.log("Deploying contract...");
    //         const contractAddress = await deployPublishedContract({
    //             client: client,
    //             chain: sepolia,
    //             account: account!,
    //             contractId: "Crowdfunding",
    //             contractParams: [
    //                 campaignName,
    //                 campaignDescription,
    //                 campaignGoal,
    //                 campaignDeadline
    //             ],
    //             publisher: "0xC08eD22AdAE10Ee7c330EBd5F9Af1a0c942e9b4A",
    //             version: "1.0.0",
    //         });
    //         alert("Contract deployed successfully!");
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsDeployingContract(false);
    //         setIsModalOpen(false);
    //         // refetch
    //     }
    // };

    const { mutate: sendTransaction, isPending: isTransactionPending } = useSendTransaction();

    const handleDeployContract = async () => {
        if (!account) {
            alert("Please connect your wallet first.");
            return;
        }
    
        setIsDeployingContract(true);
        try {
            const transaction = prepareContractCall({
                contract,
                method: "function createCampaign(string _name, string _description, uint256 _goal, uint256 _durationInDays)",
                params: [
                    campaignName,
                    campaignDescription,
                    BigInt(campaignGoal),
                    BigInt(campaignDeadline)
                ],
            });
            
            await sendTransaction(transaction);
            alert('Campaign created successfully!');
            refetch();
        } catch (error) {
            console.error(error);
            alert('Failed to create campaign');
        } finally {
            setIsDeployingContract(false);
            setIsModalOpen(false);
        }
    };

    const handleCampaignGoal = (value: number) => {
        if (value < 1) {
            setCampaignGoal(1);
        } else {
            setCampaignGoal(value);
        }
    }

    const handleCampaignLength = (value: number) => {
        if (value < 1) {
            setCampaignDeadline(1);
        } else {
            setCampaignDeadline(value);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
            <div className="w-1/2 bg-slate-100 p-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Create a Campaign</p>
                    <button
                        className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
                        onClick={() => setIsModalOpen(false)}
                    >Close</button>
                </div>
                <div className="flex flex-col">
                    <label>Campaign Name:</label>
                    <input
                        type="text"
                        value={campaignName}
                        onChange={(e) => setcampaignName(e.target.value)}
                        placeholder="Campaign Name"
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        required
                    />
                    <label>Campaign Description:</label>
                    <textarea
                        value={campaignDescription}
                        onChange={(e) => setCampaignDescription(e.target.value)}
                        placeholder="Campaign Description"
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        required
                    ></textarea>
                    <label>Campaign Goal:</label>
                    <input
                        type="number"
                        value={campaignGoal}
                        onChange={(e) => handleCampaignGoal(parseInt(e.target.value))}
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                    />
                    <label>`Campaign Length (in Days)`</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={campaignDeadline}
                            onChange={(e) => handleCampaignLength(parseInt(e.target.value))}
                            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        />
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleDeployContract}
                        disabled={isTransactionPending}
                    >{
                        isTransactionPending  ? "Creating Campaign..." : "Create Campaign"
                        }</button>
                </div>
            </div>
        </div>
    )

};