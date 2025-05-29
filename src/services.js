export const createUser = async (data) => {
  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const login = async (data) => {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};

export const getCourses = async () => {
  try {
    const response = await fetch(`http://localhost:4000/courses/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.result || "Error fetching courses";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getAuthors = async () => {
  try {
    const response = await fetch(`http://localhost:4000/authors/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.result || "Error fetching authors";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:4000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result?.result || "Failed to fetch user data";
    throw new Error(message);
  }

  return result;
};

export const updateCourseService = async (course) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:4000/courses/`, {
    method: "PUT",
    body: JSON.stringify(course),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result?.result || "Failed to update the course";
    throw new Error(message);
  }

  return result;
};

export const logout = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:4000/logout", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    const message = result?.result || "Logout failed";
    throw new Error(message);
  }

  return await response.json();
};

export const deleteCourseService = async (courseID) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:4000/courses/${courseID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    const message = result?.result || "Failed to delete course";
    throw new Error(message);
  }
};

export const createCourse = async (course) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:4000/courses/add`, {
    method: "POST",
    body: JSON.stringify(course),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result?.result || "Failed to create course";
    throw new Error(message);
  }

  return result;
};

export const createAuthor = async (authorName) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:4000/authors/add", {
    method: "POST",
    body: JSON.stringify({ name: authorName }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result?.result || "Failed to create author";
    throw new Error(message);
  }

  return result;
};
export { deleteCourseService as deleteCourse };
export { updateCourseService as updateCourse };
