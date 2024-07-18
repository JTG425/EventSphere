export async function signUp(username, password, email) {
    const response = await fetch('http://127.0.0.1:8000/eventsphere/signup/', {
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
    const response = await fetch('http://127.0.0.1:8000/eventsphere/verify/', {
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
    const response = await fetch('http://127.0.0.1:8000/eventsphere/signin/', {
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
  const url = `http://127.0.0.1:8000/eventsphere/retrieve-data/?username=${username}`;
  try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }

    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchUserList = async (username, sessionToken) => {
  const url = "http://127.0.0.1:8000/eventsphere/retrieve-users/";
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
  const url = "http://127.0.0.1:8000/eventsphere/edit-user/";
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
  const url = "http://127.0.0.1:8000/eventsphere/create-event/";
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
  const url = "http://127.0.0.1:8000/eventsphere/delete-event/";
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

export const postFriendRequest = async (data) => {
  const url = "http://127.0.0.1:8000/eventsphere/send-friend-request/";
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
  const url = "http://127.0.0.1:8000/eventsphere/decide-friend-request/";
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
