import { json } from "react-router-dom";

const API_URL = "http://44.204.149.188/eventsphere/";

export async function signUp(username, password, email) {
    const response = await fetch(`${API_URL}signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    });
    const result = await response.json();
    return result;
}

export async function verify(username, code, email) {
    const response = await fetch(`${API_URL}verify/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, code, email }),
    });
    const result = await response.json();
    return result;

}

export const signIn = async (username, password) => {
    const response = await fetch(`${API_URL}signin/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    return result;
  };


export const fetchData = async (username, accessToken) => {
  const url = `${API_URL}retrieve-data/?username=${username}`;
  console.log(url);
  try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        } 
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchUserList = async (username, sessionToken) => {
  const url = `${API_URL}/retrieve-users/`;
  const data = {
    username: username,
    sessionToken: sessionToken,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return false;
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};

export const postEditUser = async (data) => {
  const url = `${API_URL}edit-user/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const postNewEvent = async (data) => {
  const url = `${API_URL}create-event/`;
  console.log(data)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const postDeleteEvent = async (data) => {
  const url = `${API_URL}delete-event/`;
  console.log(data);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const postSearchTerm = async (data) => {
  const url = `${API_URL}search/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const postFriendRequest = async (data) => {
  const url = `${API_URL}/send-friend-request/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const decideFriendRequest = async (data) => {
  const url = `${API_URL}decide-friend-request/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
