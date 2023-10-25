export interface Result {
  status: number;
  id: string | null;
  ok: boolean;
  error?: any;
}

export const create_article = async (title: string, content: string) => {
  var result: Result;
  try {
    const response = await fetch(`/api/article`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const _result = await response.json();
    result = {
      status: response.status,
      id: _result.id,
      ok: response.ok,
    };
  } catch (error) {
    result = {
      status: 500,
      id: null,
      ok: false,
      error: error,
    };
  }
};

const update_article = async (id: string, title: string, content: string) => {
  try {
    const response = await fetch(`/api/article/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const result = await response.json();
    return {
      status: response.status,
      id: result.id,
      ok: response.ok,
    };
  } catch (error) {
    return {
      status: 500,
      id: null,
      ok: false,
      error: error,
    };
  }
}
