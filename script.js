document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Configuration: Replace with your actual URLs
  const CONFIG = {
    formspreeMembershipId: "mrbrbgjk", // Replace with your Formspree form ID
    googleSheetsUrl: "YOUR-GOOGLE-APPS-SCRIPT-URL", // Replace with your Google Apps Script web app URL
    formspreeContactId: "mpwkwzbw", // Replace with your Formspree contact form ID
  };

  // Helper: Convert FormData to object and handle checkboxes
  const formDataToObject = (formData) => {
    const data = {};
    const checkboxes = {};

    for (const [key, value] of formData.entries()) {
      // Handle checkboxes (multiple values for same key)
      if (checkboxes[key]) {
        checkboxes[key].push(value);
      } else if (data[key]) {
        // Convert existing value to array
        checkboxes[key] = [data[key], value];
        delete data[key];
      } else {
        data[key] = value;
      }
    }

    // Merge checkbox arrays back into data
    Object.keys(checkboxes).forEach((key) => {
      data[key] = checkboxes[key].join(", ");
    });

    return data;
  };

  // Submit to Google Sheets via Apps Script
  const submitToGoogleSheets = async (data, url) => {
    if (!url || url === "YOUR-GOOGLE-APPS-SCRIPT-URL") {
      console.warn("Google Sheets URL not configured");
      return { success: false, error: "Not configured" };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Google Sheets submission failed");
      }

      return { success: true };
    } catch (error) {
      console.error("Google Sheets error:", error);
      return { success: false, error: error.message };
    }
  };

  // Submit to Formspree
  const submitToFormspree = async (formData, formspreeUrl) => {
    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      return { success: true };
    } catch (error) {
      console.error("Formspree error:", error);
      return { success: false, error: error.message };
    }
  };

  // Handle membership form: Submit to BOTH Formspree and Google Sheets
  const handleMembershipForm = (form, successMessage) => {
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector("button[type='submit']");
      const originalText = submitButton ? submitButton.textContent : null;
      const formData = new FormData(form);

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }

        // Prepare data for both submissions
        const formspreeUrl = `https://formspree.io/f/${CONFIG.formspreeMembershipId}`;
        const dataObject = formDataToObject(formData);
        dataObject.timestamp = new Date().toISOString();

        // Submit to both destinations in parallel
        const [formspreeResult, sheetsResult] = await Promise.allSettled([
          submitToFormspree(formData, formspreeUrl),
          submitToGoogleSheets(dataObject, CONFIG.googleSheetsUrl),
        ]);

        // Check if at least Formspree succeeded (email notification is critical)
        const formspreeSuccess = formspreeResult.status === "fulfilled" && formspreeResult.value.success;
        const sheetsSuccess = sheetsResult.status === "fulfilled" && sheetsResult.value.success;

        if (!formspreeSuccess) {
          throw new Error("Form submission failed. Please try again or email info@biotara.earth.");
        }

        // Log Google Sheets result (non-blocking)
        if (!sheetsSuccess) {
          console.warn("Google Sheets submission failed, but Formspree succeeded");
        }

        form.reset();
        if (successMessage) {
          successMessage.style.display = "block";
          successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } catch (error) {
        alert(error.message || "We're sorry — something went wrong. Please email info@biotara.earth.");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText ?? "Submit";
        }
      }
    });
  };

  // Handle contact form: Submit to Formspree only
  const handleContactForm = (form, successMessage) => {
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector("button[type='submit']");
      const originalText = submitButton ? submitButton.textContent : null;
      const formData = new FormData(form);

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }

        const formspreeUrl = `https://formspree.io/f/${CONFIG.formspreeContactId}`;
        const response = await fetch(formspreeUrl, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Form submission failed.");
        }

        form.reset();
        if (successMessage) {
          successMessage.style.display = "block";
          successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          alert("Thank you! We'll be in touch soon.");
        }
      } catch (error) {
        alert("We're sorry — something went wrong. Please email info@biotara.earth.");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText ?? "Submit";
        }
      }
    });
  };

  // Initialize animations
  const animateElements = document.querySelectorAll("[data-animate]");
  if (animateElements.length) {
    const reveal = (element) => {
      element.classList.add("is-visible");
    };

    // Show hero immediately (no delay)
    const heroContent = document.querySelector(".hero__content[data-animate]");
    if (heroContent) {
      reveal(heroContent);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05, // Trigger earlier (5% visible instead of 16%)
          rootMargin: "0px 0px 100px 0px", // Start animating 100px before element enters viewport
        }
      );

      animateElements.forEach((element) => {
        // Don't observe hero content again (already shown)
        if (element !== heroContent) {
          observer.observe(element);
        }
      });
    } else {
      animateElements.forEach(reveal);
    }
  }

  // Initialize forms
  const membershipForm = document.getElementById("membership-form");
  const membershipSuccess = membershipForm?.querySelector(".form__success");
  handleMembershipForm(membershipForm, membershipSuccess);

  const contactForm = document.getElementById("contact-form");
  handleContactForm(contactForm);
});