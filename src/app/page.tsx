'use client';
import { getContract } from "thirdweb";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import { useReadContract } from "thirdweb/react";
import CampaignCard from "./components/CampaignCard";
// import VantaGlobe from "./components/VantaGlobe";

export default function Home() {

  const contract = getContract({
    client: client,
    chain: sepolia,
    address: CROWDFUNDING_FACTORY,
  });

  const { data: campaigns, isPending } = useReadContract({
    contract,
    method:
      "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });
  console.log(campaigns);

  return (
    <main className="mx-auto max-w-7xl px-4 mt-4 sm:px-6 lg:px-8">
      {/* <VantaGlobe /> */}
      <div className="py-20">
        <h1 className="text-4xl font-bold mb-4"> Campaigns:</h1>
        <div className="grid grid-cols-3 gap-4">
          {!isPending && campaigns && (
            campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                // <div key={campaigns.campaignAddress}>
                //   <p> Campaign </p>
                // </div>
                <CampaignCard
                  key={campaign.campaignAddress}
                  campaignAddress={campaign.campaignAddress}
                />
              ))
            ) : (
              <p>No campaigns fond</p>
            )
          )}
        </div>
      </div>
    </main>
  );
}

