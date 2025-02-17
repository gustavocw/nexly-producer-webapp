const VITE_VERCEL_API_URL: string = import.meta.env.VITE_VERCEL_API_URL;
const VITE_VERCEL_PROJECT_ID: string = import.meta.env.VITE_VERCEL_PROJECT_ID;
const VITE_VERCEL_TOKEN: string = import.meta.env.VITE_VERCEL_TOKEN;
const VITE_VERCEL_TOKEN_FULL: string = import.meta.env.VITE_VERCEL_TOKEN_FULL;

type ApiResponse<T> = {
  error: boolean;
  message: string;
  data?: T;
  missingRecords?: DNSRecord[];
};

interface DNSRecord {
  type: string;
  name: string;
  value: string;
}

export const checkDomainStatus = async (
  domain: string
): Promise<ApiResponse<any>> => {
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
      await addCustomDomain(domain);
      return {
        error: true,
        message: "Domínio adicionado, aguardando propagação DNS.",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.error?.message || "Erro ao verificar domínio",
      };
    }

    return {
      error: false,
      message: data.verified
        ? "Domínio verificado com sucesso."
        : "Domínio não verificado.",
      data,
    };
  } catch (err) {
    return { error: true, message: "Erro na conexão com a API da Vercel" };
  }
};

export const addCustomDomain = async (
  domain: string
): Promise<ApiResponse<any>> => {
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
      return {
        error: true,
        message: data.error?.message || "Erro ao adicionar domínio",
      };
    }

    return { error: false, message: "Domínio adicionado com sucesso.", data };
  } catch (err) {
    return { error: true, message: "Erro na conexão com a API da Vercel" };
  }
};

export const verifyDNSRecords = async (
  domain: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${VITE_VERCEL_API_URL}/v5/domains/${domain}/config`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${VITE_VERCEL_TOKEN_FULL}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: true,
        message: errorData.error?.message || "Erro ao verificar registros DNS",
        data: errorData,
      };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return { error: true, message: "Erro na conexão com a API da Vercel" };
  }
};

export const listDomains = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.error?.message || "Erro ao listar domínios",
      };
    }

    return { error: false, message: "Domínios listados com sucesso.", data };
  } catch (err) {
    return { error: true, message: "Erro na conexão com a API da Vercel" };
  }
};

export const deleteDomain = async (
  domain: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(
      `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains/${domain}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return { error: false, message: "Domínio removido com sucesso." };
    }

    const data = await response.json();
    return {
      error: true,
      message: data.error?.message || "Erro ao remover domínio",
    };
  } catch (err) {
    return { error: true, message: "Erro na conexão com a API da Vercel" };
  }
};

export const editDomain = async (
  oldDomain: string,
  newDomain: string
): Promise<ApiResponse<any>> => {
  try {
    const deleteResponse = await fetch(
      `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains/${oldDomain}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      return {
        error: true,
        message: errorData.error?.message || "Erro ao remover o domínio antigo",
      };
    }

    const addResponse = await fetch(
      `${VITE_VERCEL_API_URL}/v9/projects/${VITE_VERCEL_PROJECT_ID}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VITE_VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newDomain }),
      }
    );

    if (!addResponse.ok) {
      const errorData = await addResponse.json();
      return {
        error: true,
        message: errorData.error?.message || "Erro ao adicionar o novo domínio",
      };
    }

    const data = await addResponse.json();
    return { error: false, message: "Domínio editado com sucesso.", data };
  } catch (err) {
    return { error: true, message: "Erro na conexão com a API da Vercel" };
  }
};
