import fs from 'fs';
import path from 'path';

/**
 * Simple helper script to update contract addresses after deployment
 * Run this manually after deploying contracts
 * 
 * Usage: 
 * node update-contracts.js <network-id> <exchange-address> <token-address> <auto-claimer-address>
 * 
 * Example:
 * node update-contracts.js 11155111 0x1234... 0x5678... 0x9abc...
 */

function updateContractsFile() {
    const args = process.argv.slice(2);
    if (args.length < 4) {
        console.error('Usage: node update-contracts.js <network-id> <exchange-address> <token-address> <auto-claimer-address>');
        process.exit(1);
    }

    const [networkId, exchangeAddress, tokenAddress, autoClaimerAddress] = args;

    const contractsPath = path.join(process.cwd(), 'src', 'utils', 'contracts.ts');

    if (!fs.existsSync(contractsPath)) {
        console.error(`Contracts file not found at ${contractsPath}`);
        process.exit(1);
    }

    let content = fs.readFileSync(contractsPath, 'utf8');

    // Update the addresses in the file
    const addressRegex = new RegExp(`'${networkId}':\\s*{[^}]*}`, 'g');
    const replacement = `'${networkId}': {
        GreenTokenExchange: '${exchangeAddress}' as Address,
        GreenToken: '${tokenAddress}' as Address,
        GreenTokenAutoClaimer: '${autoClaimerAddress}' as Address,
    }`;

    if (addressRegex.test(content)) {
        content = content.replace(addressRegex, replacement);
    } else {
        // Add new network entry if it doesn't exist
        const contractsRegex = /export const CONTRACT_ADDRESSES[\s\S]*?{/;
        content = content.replace(contractsRegex, (match) => {
            return `${match}\n    ${replacement},`;
        });
    }

    fs.writeFileSync(contractsPath, content);
    console.log(`Updated contract addresses for network ${networkId}:`);
    console.log(`GreenTokenExchange: ${exchangeAddress}`);
    console.log(`GreenToken: ${tokenAddress}`);
    console.log(`GreenTokenAutoClaimer: ${autoClaimerAddress}`);
}

updateContractsFile();
