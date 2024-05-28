const axios = require('axios');
const os = require('os');
const process = require('process');

// 从 ipify 获取 IPv6 地址
async function getIPv6FromIpify() {
    try {
        const response = await axios.get('https://api6.ipify.org/?format=json');
        if (response.data.ip)
            return response.data.ip;
        else
            return null;
    } catch (error) {
        console.error('Error fetching IPv6 from ipify:', error.message);
        return null;
    }
}

// 获取本地 IPv6 地址
function getLocalIPv6Address() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const addressInfo of addresses) {
            if (addressInfo.family === 'IPv6' && !addressInfo.internal) {
                return addressInfo.address;
            }
        }
    }
    throw new Error('没有获取到IPV6地址');
}

// 更新 dynv6 的 DNS 记录
async function updateDynv6(ipv6Address, token, zone) {
    try {
        const response = await axios.get(
            `https://dynv6.com/api/update`,
            {
                params:{
                    zone: zone,
                    token: token,
                    ipv6: ipv6Address
                }
            }
        );
        console.log('更新成功', response.data);
    } catch (error) {
        console.error('更新失败:', error.response ? error.response.data : error.message);
    }
}

async function updateIP(token, zone) {
    let ipv6Address = await getIPv6FromIpify();
    if (!ipv6Address) {
        ipv6Address = getLocalIPv6Address();
    }

    console.log('IPv6 地址为:', ipv6Address);

    await updateDynv6(ipv6Address, token, zone);
}

// 主函数
async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error('必须提供以下参数 <token> <zone>');
        process.exit(1);
    }

    const [token, zone] = args;

    await updateIP(token, zone)

    setInterval(async () => {
        await updateIP(token, zone)
    }, 60 * 1000)
}

main().catch((error) => {
    console.error('报错:', error.message);
});
