module.exports = {
  ...(typeof createLoginTracker !== "undefined" && { createLoginTracker }),
};
function createLoginTracker(userInfo) {
  let Count = 0;

  return (passwordAttempt) => {
    Count++;

    if (Count > 3) {
      return "Account locked due to too many failed login attempts";
    }

    if (passwordAttempt === userInfo.password) {
      return "Login successful";
    }

    return `Attempt ${Count}: Login failed`;
  };
}

function startLoginProcess() {
  const tracker = createLoginTracker({
    username: "student",
    password: "1234",
  });

  function askPassword() {
    const userInput = prompt("Enter your password:");
    const message = tracker(userInput);
    alert(message);

    if (message === "Login successful" || message.includes("Account locked")) {
      return;
    }

    askPassword();
  }

  askPassword();
}
