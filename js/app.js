// ==========================================
// PROVIDED REGULAR EXPRESSIONS
// ==========================================
const STUDENT_NUMBER_REGEX = /^\d{2}-\d{4}-\d{3}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================
// PART B - PURE VALIDATION FUNCTION (40 PTS)
// - Independent of DOM (no document/window access)
// - Pure boolean return
// ==========================================
function validateStudentInfo(name, studentNumber, email) {
  // 1. Name validation: trim first; min 3 chars; cannot contain numbers
  if (typeof name !== 'string') return false;
  const trimmedName = name.trim();
  if (trimmedName.length < 3) return false;
  if (/\d/.test(trimmedName)) return false;

  // 2. Student Number validation: match regex
  if (typeof studentNumber !== 'string' || !STUDENT_NUMBER_REGEX.test(studentNumber.trim())) {
    return false;
  }

  // 3. Email Address validation: match regex
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return false;
  }

  return true;
}

// Optional export for Node-based autograder environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateStudentInfo };
}

// ==========================================
// BROWSER DOM INITIALIZATION & EVENT HANDLERS
// ==========================================
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // --- PART A: SELECT REQUIRED DOM ELEMENTS ---
    const registrationForm = document.getElementById('registrationForm');
    const studentNameInput = document.getElementById('studentName');
    const studentNumberInput = document.getElementById('studentNumber');
    const emailInput = document.getElementById('email');
    const workshopSelect = document.getElementById('workshop');
    const termsCheckbox = document.getElementById('terms');

    // Error Containers
    const nameError = document.getElementById('nameError');
    const studentNumberError = document.getElementById('studentNumberError');
    const emailError = document.getElementById('emailError');
    const workshopError = document.getElementById('workshopError');
    const termsError = document.getElementById('termsError');

    // Buttons & Output Container
    const clearBtn = document.getElementById('clearBtn');
    const registrationResult = document.getElementById('registrationResult');
    const summaryName = document.getElementById('summaryName');
    const summaryStudentNumber = document.getElementById('summaryStudentNumber');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryWorkshop = document.getElementById('summaryWorkshop');

    // Initial state: hide registration result container
    if (registrationResult) {
      registrationResult.style.display = 'none';
    }

    // Helper: Clear all error messages
    function clearErrors() {
      if (nameError) nameError.textContent = '';
      if (studentNumberError) studentNumberError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (workshopError) workshopError.textContent = '';
      if (termsError) termsError.textContent = '';
    }

    // Individual Field Checks for Granular Error Messages
    function isNameValid(val) {
      if (typeof val !== 'string') return false;
      const trimmed = val.trim();
      return trimmed.length >= 3 && !/\d/.test(trimmed);
    }

    function isStudentNumberValid(val) {
      return typeof val === 'string' && STUDENT_NUMBER_REGEX.test(val.trim());
    }

    function isEmailValid(val) {
      return typeof val === 'string' && EMAIL_REGEX.test(val.trim());
    }

    // --- PART C & D: FORM SUBMISSION HANDLER ---
    if (registrationForm) {
      registrationForm.addEventListener('submit', (e) => {
        // Prevent default browser page reload
        e.preventDefault();

        // Clear existing errors
        clearErrors();

        const nameVal = studentNameInput ? studentNameInput.value : '';
        const studentNumVal = studentNumberInput ? studentNumberInput.value : '';
        const emailVal = emailInput ? emailInput.value : '';
        const workshopVal = workshopSelect ? workshopSelect.value : '';
        const termsChecked = termsCheckbox ? termsCheckbox.checked : false;

        let hasError = false;

        // 1. Validate Student Name
        if (!isNameValid(nameVal)) {
          if (nameError) nameError.textContent = 'Enter a valid student name.';
          hasError = true;
        }

        // 2. Validate Student Number
        if (!isStudentNumberValid(studentNumVal)) {
          if (studentNumberError) studentNumberError.textContent = 'Enter a valid student number.';
          hasError = true;
        }

        // 3. Validate Email
        if (!isEmailValid(emailVal)) {
          if (emailError) emailError.textContent = 'Enter a valid email address.';
          hasError = true;
        }

        // 4. Validate Workshop
        if (!workshopVal || workshopVal === '' || workshopVal === 'default') {
          if (workshopError) workshopError.textContent = 'Please select a workshop.';
          hasError = true;
        }

        // 5. Validate Terms & Conditions
        if (!termsChecked) {
          if (termsError) termsError.textContent = 'You must accept the Terms and Conditions.';
          hasError = true;
        }

        // Handle Result Display
        if (!hasError) {
          // Display values safely using textContent
          if (summaryName) summaryName.textContent = nameVal.trim();
          if (summaryStudentNumber) summaryStudentNumber.textContent = studentNumVal.trim();
          if (summaryEmail) summaryEmail.textContent = emailVal.trim();

          let selectedText = workshopVal;
          if (workshopSelect && workshopSelect.selectedIndex !== -1) {
            selectedText = workshopSelect.options[workshopSelect.selectedIndex].text;
          }
          if (summaryWorkshop) summaryWorkshop.textContent = selectedText;

          // Show result container
          if (registrationResult) registrationResult.style.display = 'block';
        } else {
          // Hide result container if any validation fails
          if (registrationResult) registrationResult.style.display = 'none';
        }
      });
    }

    // --- PART E: CLEAR BUTTON RESET ---
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        // Clear input values
        if (studentNameInput) studentNameInput.value = '';
        if (studentNumberInput) studentNumberInput.value = '';
        if (emailInput) emailInput.value = '';

        // Reset dropdown
        if (workshopSelect) workshopSelect.selectedIndex = 0;

        // Uncheck terms
        if (termsCheckbox) termsCheckbox.checked = false;

        // Remove error messages
        clearErrors();

        // Hide result container
        if (registrationResult) registrationResult.style.display = 'none';
      });
    }
  });
}