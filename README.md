# Make Music Equal

Make Music Equal's website is hosted on Webflow but includes multiple custom charts that come from this repo. Here is a breakdown on how to update the charts if needed and replicate this setup for other Webflow sites with custom code we might want to create in the future.
<br>
To run the repo locally
```
npm run start
```
<br>

To view the elements, you can replace the published repo URL for the localhost in the Webflow site's head, then click Save.<br><br>
<img width="898" height="695" alt="Screenshot 2025-07-25 at 2 57 50 PM" src="https://github.com/user-attachments/assets/10c8997f-cdc3-417a-a2d6-c8b4f6fa9819" /> <br><br>

Publish to staging URL only. Now, you will be able to see any changes you make to the code locally in the Webflow staging site.<br><br>
<img width="435" height="364" alt="Screenshot 2025-07-25 at 2 59 42 PM" src="https://github.com/user-attachments/assets/07ef0481-d132-41f0-944d-3bcd09262551" /><br><br>

Make sure all new components include "use strict" at the top. main.js must include this code in order to render the components.
```
window.Webflow || = []; window.Webflow.push()
```
<img width="790" height="657" alt="Screenshot 2025-07-25 at 3 07 16 PM" src="https://github.com/user-attachments/assets/1c5a2e5c-61ba-41c7-a9da-31c195666752" /><br><br>

Commit changes to repo as normal. As soon as they are deployed, they will show up in the main Webflow site.
