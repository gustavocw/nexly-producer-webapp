const VITE_VERCEL_API_URL: string = import.meta.env.VITE_VERCEL_API_URL;
const VITE_VERCEL_PROJECT_ID: string = import.meta.env.VITE_VERCEL_PROJECT_ID;
const VITE_VERCEL_TOKEN: string = import.meta.env.VITE_VERCEL_TOKEN;

type ApiResponse<T> = { error: boolean; message: string; data?: T; missingRecords?: DNSRecord[] };

interface DNSRecord {
    type: string;
    name: string;
    value: string;
}

export const checkDomainStatus = async (domain: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(
            `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains/${domain}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 404) {
            console.log(`🔴 Domínio ${domain} não encontrado. Tentando adicioná-lo...`);
            await addCustomDomain(domain);
            return { error: true, message: "Domínio adicionado, aguardando propagação DNS." };
        }

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.error?.message || "Erro ao verificar domínio" };
        }

        return {
            error: false,
            message: data.verified ? "Domínio verificado com sucesso." : "Domínio não verificado.",
            data
        };
    } catch (err) {
        console.error("Erro na conexão com a API da Vercel:", err);
        return { error: true, message: "Erro na conexão com a API da Vercel" };
    }
};

export const addCustomDomain = async (domain: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(
            `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: domain }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.error?.message || "Erro ao adicionar domínio" };
        }

        return { error: false, message: "Domínio adicionado com sucesso.", data };
    } catch (err) {
        console.error("Erro ao adicionar domínio na Vercel:", err);
        return { error: true, message: "Erro na conexão com a API da Vercel" };
    }
};

export const verifyDNSRecords = async (domain: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(
            `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains/${domain}/records`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 404) {
            console.warn(`❌ O domínio ${domain} não possui registros DNS configurados na Vercel.`);
            return { error: true, message: "Aguardando propagação dos registros DNS." };
        }

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.error?.message || "Erro ao verificar registros DNS" };
        }

        const requiredRecords: DNSRecord[] = [
            { type: "A", name: domain, value: "76.76.21.21" },
            { type: "TXT", name: `_vercel.${domain}`, value: `vc-domain-verify=${domain},110ca7838b20b76d549e` },
            { type: "CNAME", name: "www", value: "cname.vercel-dns.com" },
        ];

        const existingRecords = data.records.map((record: DNSRecord) => ({
            type: record.type,
            name: record.name,
            value: record.value
        }));

        const missingRecords = requiredRecords.filter(record => 
            !existingRecords.some((dnsRecord: DNSRecord) => 
                dnsRecord.type === record.type && 
                dnsRecord.name === record.name && 
                dnsRecord.value === record.value
            )
        );

        if (missingRecords.length > 0) {
            return { error: true, message: "Registros DNS incorretos ou faltando", missingRecords };
        }

        return { error: false, message: "Todos os registros DNS estão corretos" };
    } catch (err) {
        console.error("Erro na verificação de DNS:", err);
        return { error: true, message: "Erro na conexão com a API da Vercel" };
    }
};
