# Desktop Funnel Dashboard

This GitHub repository powers a (Mozilla-internal) dashboard showing our Desktop
acquisition funnel.

The actual dashboard can be found at https://protosaur.dev/numbers-that-matter/

## Getting up and running

This requires a Mozilla LDAP account and [node.js](https://nodejs.org/)

This is a two step process:

1. Create a file called "queries.json" in the root of the project with the
   content cited in the
   [Numbers that Matter Documentation](https://docs.google.com/document/d/1fvd8J-WJODuSlQB8lZAsmeTwcJjHA40G-bNXQeFOy-I/edit#heading=h.l8it93r6ndw).
2. Run `npm install && npm run dev` locally to start a local instance.
