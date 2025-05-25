# Fixed Price Mode

## Introduction to Fixed Price Mode

Fixed Price Launches allow participants to acquire tokens at a pre-determined price and valuation. Launch Layer's fixed price raise contracts are deployed via a factory, ensuring transparency and standardization. The process is designed to be simple, accessible, and fair, with all logic enforced on-chain.

## Community Round

### Phase 1 — Community GTD (Guaranteed Allocation)

This phase offers guaranteed allocation to eligible contributors via:

- **Whitelist Participation**: Projects may whitelist specific wallet addresses based on criteria such as NFT ownership or community engagement. (TODO: Confirm if Launch Layer supports Gacha/lottery or only whitelists)

This phase typically runs for **4 hours**, during which all eligible participants may contribute up to their allocated amount.

### Phase 2 — Community FCFS

Any unfilled allocation from the Community GTD phase will be made available in the Community FCFS phase.

- Eligible participants include all whitelisted users and any other users as defined by the project.
- Eligible participants may contribute up to 5x the allocation cap of one allocation ticket in the Community GTD round. (TODO: Confirm if this logic is the same for Launch Layer)
- This phase typically lasts 1 hour.

## Public Round

The Public Round introduces an open and ungated opportunity for broader participation — no whitelist or allocation tickets required. It is available as an optional phase at the discretion of the launching project.

Projects can configure the following parameters:

- Total token allocation available for the Public Round
- Contribution caps per unique wallet
- Token price (launches may set a discounted token price for the Community Round and a full token price for the Public Round)

If this phase is enabled, any unfilled allocation from the Community Round will automatically roll over into the Public Round, ensuring maximum participation.

## Participating in a Fixed Price Mode Launch

Take note before participating in Launch Layer fixed price token launches:

- **Sale phases**: Pay attention to the dates and times for each phase to avoid missing out.
- **Secure allocation**: If whitelisting or presale is used, ensure you are eligible and have prepared your funds in advance for each launch.
- **Verify official information**: Ensure you are on the correct site. Do not rely on information or links from third parties. Launch Layer will publish all essential updates on official channels.

### Phase 1: Registration

**Duration: 36 hours**

- **Registration & Whitelist Entry**: Participants may need to register or be whitelisted for allocation in the presale round. (TODO: Confirm if Launch Layer supports Merkle proof-based presale/whitelist and how users register)
- **Entry Limits**: Projects may set limits on the number of entries or allocations per wallet.
- **Non-cancellable**: Entries are final and non-reversible, regardless of the outcome.
- **Community Round Allocations**: During this period, users can check their Community Round allocations, if any, by connecting their wallets.

### Phase 2: Allocation Announcement

**Duration: 8 hours**

- **Results**: After the registration period, allocation results will be made available immediately.
- **Next Steps and Preparations**: If you have won or been granted allocation, prepare your funds for the Contribution phase.
- If you have Community Round allocation, but did not win allocation tickets, you may still participate in the Community Round. (TODO: Confirm if this logic applies to Launch Layer)

### Phase 3: Community GTD Round Contribution

**Duration: 4 hours**

- **Eligibility**: Only whitelisted wallets and users who won allocation tickets (if applicable) will be able to participate in the Community Round.
- **Contribution Cap**: Contribute up to your allocated cap. Any unfilled allocation will be moved to the Community FCFS round.

### Phase 4: Community FCFS Contribution

**Duration: 1 hour, or until token supply is fully sold**

- **Eligibility**: Open to all registered users, regardless of whether they won allocation tickets.
- **Allocation Cap**: The allocation cap for the Community FCFS phase is five times the allocation for one allocation ticket in the Community GTD phase. (TODO: Confirm if this logic is the same for Launch Layer)
- **First Come First Serve**: This round is on a first-come-first-serve basis until the token supply is fully sold out or when the window closes.

### Phase 5: Public Round (Optional)

- **Eligibility**: This Round is ungated. All users are open to participate and contribute in the Public Round.
- **Allocation Cap**: A contribution cap per unique wallet may be imposed by the project.

### Phase 6: Token timelock

**Duration: 2 hours**

- **Timelock**: After the token sale concludes, tokens may be time-locked for a short period. (TODO: Confirm if Launch Layer enforces a timelock and for how long)

### Phase 6: Token Claim

- **Token Claim**: After the timelock, users can claim all their tokens, including those from airdrop and the different sale phases. Users will be able to trade or provide liquidity for the token on Sonic DEXs.

## FAQ: Fixed Price Mode

- **What if a token launch is incomplete/unsuccessful?**
  - If less than 25% of the tokens are sold all rounds (12 hours), the token sale will be deemed unsuccessful. All participants will receive a full refund of their contributions, the liquidity pool will not be seeded, and airdrop allocations will be returned to the protocol. (TODO: Confirm if Launch Layer uses the same thresholds and refund logic)
  - If 25% to 99% of tokens are sold, the sale is considered successful. The liquidity pool will be seeded and all participants will receive their protocol tokens as intended. (TODO: Confirm if Launch Layer uses the same logic)
- **What happens to the liquidity bootstrapped after the token launch event?**
  - Funds raised will be deployed in a whitelisted liquidity pool on Sonic. In some cases, a portion may be withdrawn by the project team for other uses, with details communicated to the community. (TODO: Confirm Launch Layer's liquidity deployment process)
- **How do I get more allocation into a token launch?**
  - Win more allocation by being whitelisted or by meeting project-specific criteria. (TODO: Confirm if there are other ways to increase allocation in Launch Layer)
- **If I did not win allocation, can I still participate in the Community FCFS Phase?**
  - Yes, if you registered and spent Gacha (if applicable), you can participate in the Community FCFS Phase if there is remaining allocation. (TODO: Confirm if Gacha/lottery is used in Launch Layer) 