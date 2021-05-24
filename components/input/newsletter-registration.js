import { useRef, useState, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef();
  const [error, setError] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const emailValue = emailRef.current.value;
    if (emailValue.trim() !== "") {
      // show pending staus
      notificationCtx.showNotification({
        title: "Signup...",
        status: "pending",
        message: "Registering for newsletter",
      });
      fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        })
        .then((data) => {
          // show success status
          notificationCtx.showNotification({
            title: "Signup...",
            status: "success",
            message: "Successfully registered for newsletter!",
          });
        })
        .catch((error) => {
          // show error status
          notificationCtx.showNotification({
            title: "Error!",
            status: "error",
            message: error.message | "Something went wrong!",
          });
        });
    } else {
      setError({
        email: "Empty email",
      });
    }
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          {error.email && <p>Invalid email address</p>}
          <button disabled={error.length > 0}>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
