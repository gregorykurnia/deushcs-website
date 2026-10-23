#!/usr/bin/env bash
# Records deushcs.com's DNS records as Hostinger's own nameservers serve them (Task 7.3c), for the
# cutover's rollback and for `scripts/check-launch.mjs`, which checks that mail records still match.
# Usage: scripts/record-dns.sh > docs/launch/dns-before.txt
# Each query is a `;; query <name> <type>` line followed by dig's answer lines; no answer lines means
# the record didn't exist.
set -euo pipefail

domain=deushcs.com
ns=$(dig +short NS "$domain" | sort | head -n1)
if [ -z "$ns" ]; then
  echo "No nameserver found for $domain" >&2
  exit 1
fi

echo ";; DNS for $domain, recorded $(date -u '+%Y-%m-%d %H:%M UTC') from $ns with scripts/record-dns.sh"
echo ";; Web records: the cutover changes only the @ and www ones. Rollback restores them from here."
echo ";; Mail records: the cutover never touches them. check-launch.mjs compares them with this file."
echo

query() {
  echo ";; query $1 $2"
  dig @"$ns" +noall +answer "$1" "$2"
  echo
}

for name in "$domain" "www.$domain"; do
  for type in A AAAA CNAME; do query "$name" "$type"; done
done
query "$domain" MX
query "$domain" TXT
query "_dmarc.$domain" TXT
query "titan1._domainkey.$domain" TXT
query "resend._domainkey.notify.$domain" TXT
query "send.notify.$domain" MX
query "send.notify.$domain" TXT
query "_dmarc.notify.$domain" TXT
query "$domain" CAA
