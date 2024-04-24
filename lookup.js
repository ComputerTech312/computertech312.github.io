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
