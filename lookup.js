document.getElementById('lookup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const lookupType = document.getElementById('lookup-type').value;
    const lookupInput = document.getElementById('lookup-input').value;
    if (lookupInput) {
        document.getElementById('lookup-result').textContent = 'Loading...';
        if (lookupType === 'ip' && isValidIP(lookupInput)) {
            ipLookup(lookupInput);
        } else if (lookupType === 'ping' && (isValidIP(lookupInput) || isValidDomain(lookupInput))) {
            pingService(lookupInput); // Handle ping service
        } else if (isValidDomain(lookupInput)) {
            dnsLookup(lookupType, lookupInput);
        } else {
            document.getElementById('lookup-result').textContent = 'Invalid input. Please enter a valid value.';
        }
    }
});

document.getElementById('subnet-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ip = document.getElementById('subnet-ip').value;
    const mask = document.getElementById('subnet-mask').value;
    if (isValidIP(ip) && isValidIP(mask)) {
        const subnet = calculateSubnet(ip, mask);
        document.getElementById('subnet-result').textContent = `Network: ${subnet.network}, Broadcast: ${subnet.broadcast}`;
    } else {
        document.getElementById('subnet-result').textContent = 'Invalid input. Please enter a valid IP and subnet mask.';
    }
});

function isValidIP(ip) {
    const ipV4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const cidrRegex = /^[0-9]{1,2}$/;
    return ipV4Regex.test(ip) || cidrRegex.test(ip);
}

function calculateSubnet(ip, mask) {
    const ipParts = ip.split('.').map(part => parseInt(part, 10));
    let maskParts;

    if (mask.includes('.')) { // Subnet mask is in IP format
        maskParts = mask.split('.').map(part => parseInt(part, 10));
    } else { // Subnet mask is in CIDR format
        let cidr = parseInt(mask, 10);
        maskParts = [];
        for (let i = 0; i < 4; i++) {
            const bits = Math.min(cidr, 8);
            maskParts.push(((2 ** bits) - 1) << (8 - bits));
            cidr -= bits;
        }
    }

    const network = ipParts.map((part, index) => part & maskParts[index]);
    const broadcast = network.map((part, index) => part | (255 - maskParts[index]));

    return {
        network: network.join('.'),
        broadcast: broadcast.join('.')
    };
}

function isValidDomain(domain) {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
    return domainRegex.test(domain);
}

function ipLookup(ip) {
    fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('IP lookup failed');
            }
            return response.json();
        })
        .then(data => {
            const resultDiv = document.getElementById('lookup-result');
            resultDiv.innerHTML = `
                <iframe
                    width="800"
                    height="600"
                    style="border:0; float:right; margin-left:20px;"
                    loading="lazy"
                    allowfullscreen
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAtrFh_crzA2RkiayqwdMLhE4kx4Op9RSI&q=${data.latitude},${data.longitude}">
                </iframe>
                <h2>IP Lookup Result</h2>
                <p><strong>IP:</strong> ${data.ip}</p>
                <p><strong>City:</strong> ${data.city}</p>
                <p><strong>Region:</strong> ${data.region}</p>
                <p><strong>Country:</strong> ${data.country_name}</p>
                <p><strong>Postal Code:</strong> ${data.postal}</p>
                <p><strong>Timezone:</strong> ${data.timezone}</p>
                <p><strong>Country Calling Code:</strong> ${data.country_calling_code}</p>
                <p><strong>Currency:</strong> ${data.currency_name} (${data.currency})</p>
                <p><strong>Languages:</strong> ${data.languages}</p>
                <p><strong>ASN:</strong> ${data.asn}</p>
                <p><strong>ISP:</strong> ${data.org}</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('lookup-result').textContent = 'IP lookup failed. Please try again.';
        });
}

function dnsLookup(type, domain) {
    fetch(`https://dns.google/resolve?name=${domain}&type=${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('DNS lookup failed');
            }
            return response.json();
        })
        .then(data => {
            const resultDiv = document.getElementById('lookup-result');
            resultDiv.innerHTML = `
                <h2>DNS ${type} Lookup Result</h2>
                ${data.Answer.map(answer => `<p><strong>${answer.name}</strong> ${answer.data}</p>`).join('')}
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('lookup-result').textContent = 'DNS lookup failed. Please try again.';
        });
}