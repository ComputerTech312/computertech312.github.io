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

function isValidIP(ip) {
    const ipV4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const ipV6Regex = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/;
    return ipV4Regex.test(ip) || ipV6Regex.test(ip);
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
                    width="800"  // Increase the width
                    height="600" // Increase the height
                    style="border:0; float:right; margin-left:20px;" // Increase the left margin
                    loading="lazy"
                    allowfullscreen
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAtrFh_crzA2RkiayqwdMLhE4kx4Op9RSI&q=${data.latitude},${data.longitude}">
                </iframe>
                <h2>IP Lookup Result</h2>
                <p><strong>IP:</strong> ${data.ip}</p>
                <p><strong>Network:</strong> ${data.network}</p>
                <p><strong>Version:</strong> ${data.version}</p>
                <p><strong>City:</strong> ${data.city}</p>
                <p><strong>Region:</strong> ${data.region}</p>
                <p><strong>Country:</strong> ${data.country_name}</p>
                <p><strong>Postal Code:</strong> ${data.postal}</p>
                <p><strong>Timezone:</strong> ${data.timezone}</p>
                <p><strong>UTC Offset:</strong> ${data.utc_offset}</p>
                <p><strong>Country Calling Code:</strong> ${data.country_calling_code}</p>
                <p><strong>Currency:</strong> ${data.currency_name} (${data.currency})</p>
                <p><strong>Languages:</strong> ${data.languages}</p>
                <p><strong>Country Area:</strong> ${data.country_area}</p>
                <p><strong>Country Population:</strong> ${data.country_population}</p>
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

document.getElementById('subnet-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ipAddress = document.getElementById('ip-address').value;
    const cidrValue = document.getElementById('cidr-value').value;
    if (isValidIP(ipAddress) && isValidCIDR(cidrValue)) {
        calculateSubnet(ipAddress, cidrValue);
    } else {
        document.getElementById('subnet-result').textContent = 'Invalid input. Please enter a valid IP address and CIDR value.';
    }
});

function isValidCIDR(cidr) {
    const cidrValue = parseInt(cidr, 10);
    return Number.isInteger(cidrValue) && cidrValue >= 0 && cidrValue <= 128;
}

function calculateSubnet(ip, cidr) {
    // Convert IP address and CIDR value to binary
    const ipBinary = ip.split('.').map(octet => ('00000000' + parseInt(octet, 10).toString(2)).slice(-8)).join('');
    const cidrBinary = ('1'.repeat(cidr) + '0'.repeat(32 - cidr)).split('');

    // Calculate network address and broadcast address
    const networkAddress = cidrBinary.map((bit, index) => bit === '1' ? ipBinary[index] : '0').join('');
    const broadcastAddress = cidrBinary.map((bit, index) => bit === '0' ? '1' : ipBinary[index]).join('');

    // Calculate number of valid hosts
    const numHosts = Math.pow(2, 32 - cidr) - 2;

    // Calculate wildcard mask and subnet mask
    const wildcardMask = cidrBinary.map(bit => bit === '1' ? '0' : '1').join('');
    const subnetMask = cidrBinary.join('');

    // Convert binary addresses and masks to decimal
    const networkAddressDecimal = networkAddress.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');
    const broadcastAddressDecimal = broadcastAddress.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');
    const wildcardMaskDecimal = wildcardMask.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');
    const subnetMaskDecimal = subnetMask.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');

    // Display subnet information on webpage
    document.getElementById('subnet-result').innerHTML = `
        <p><strong>Network Address:</strong> ${networkAddressDecimal}</p>
        <p><strong>Broadcast Address:</strong> ${broadcastAddressDecimal}</p>
        <p><strong>Number of Valid Hosts:</strong> ${numHosts}</p>
        <p><strong>Wildcard Mask:</strong> ${wildcardMaskDecimal}</p>
        <p><strong>Subnet Mask:</strong> ${subnetMaskDecimal}</p>
    `;
}

window.onload = function() {
    // Get the select element
    var select = document.getElementById("cidr-value");

    // Add an option for each CIDR value from 0 to 128
    for (var i = 128; i >= 0; i--) {
        var option = document.createElement("option");
        option.value = i;
        option.text = "/" + i;
        select.add(option);
    }
};