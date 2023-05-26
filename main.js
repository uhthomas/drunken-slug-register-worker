export default {
  async fetch(request, env) {
    const closed = this.check()

    return new Response(closed ? "closed" : "open")
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(this.check())
  },

  async check() {
    const res = await fetch("https://drunkenslug.com/register")
    const text = await res.text()

    const closed = text.includes("The Bar is closed.")

    if (!closed) {
       await fetch("https://discord.com/api/webhooks/1092792971491037354/tO-FvzI_m2kxAVLiBvvufWGyWVIYg2U3PA8fcErouHG-reApwE8ra3uFciJ1efMLigfU", {
            headers: {
                "content-type": "application/json;charset=UTF=8"
            },
            method: "POST",
            body: JSON.stringify({
              "allowed_mentions": {
                "parse": ["users", "roles", "everyone"]
              },
              "content": "<@105750004563509248> drunken slug is open! https://drunkenslug.com/register",
            })
        })
    }

    console.log(`closed: ${closed}`)

    return closed
  }
}
