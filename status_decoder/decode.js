function getMacroVal(element) {
  // Get the text content of the element
  const text = element.textContent;

  // Use a regular expression to match the number in parentheses
  const match = text.match(/\((-?\d+)\)/);

  // If a match is found, return the captured number, otherwise return null
  return match ? parseInt(match[1], 10) : null;
}

async function fetchMacroName(inputValue) {
  const url = 'https://jgromes.github.io/RadioLib/group__status__codes.html';

  try {
      // Fetch the HTML content from the URL
      const response = await fetch(url);

      // Check if the response is successful
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Retrieve the HTML text
      const htmlText = await response.text();

      // Parse the HTML text into a DOM document
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Find all macro definitions (adjust selector if necessary)
      const macros = doc.querySelectorAll('.memItemRight');

      // Loop through macros and check if any match the input value
      for (let macro of macros) {
          console.log(macro)
          // Assuming the macro name is within a certain tag (e.g., `.memname`)
          const macroNameElement = macro.querySelector('.el');

          if (macroNameElement) {
              const macroName = macroNameElement.textContent.trim();
              const macroValue = getMacroVal(macro)
              console.log(macroValue)

              // Check if the description contains the input value
              if (macroValue == inputValue) {
                  return macroName; // Return the macro name if found
              }
          }
      }

      // If no match is found
      return `No macro found for value: ${inputValue}`;
  } catch (error) {
      console.error("Error fetching or parsing the HTML:", error);
      return "Error fetching or parsing the HTML.";
  }
}
