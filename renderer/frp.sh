#visit the frp.apsu.tech:34343 => web.kknd0.cn
RANDNAME=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 6 ; echo '')
./frpc tcp -s frp.apsu.tech:7000 -n "${RANDNAME}" -i 127.0.0.1 -l 5000 -r 34343 --tls_enable -t yangpaopao