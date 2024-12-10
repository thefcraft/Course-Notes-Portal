# TODO: Frontend

1. Home Page
    - URL: /
    - Description: Landing page for the portal. It provides an overview, quick navigation links, and search options.
    - Components:
        - [ ] Search bar with filters (keywords, subjects, tags, branch).
        - [ ] Quick links to popular or recently uploaded notes.
        - [ ] Carousel/Section showcasing top-rated notes or featured materials.
        - [ ] Login/Signup buttons (if the user isn't logged in).
        - [ ] Dashboard shortcut (if the user is logged in).

2. User Management
    - URLs:
        - [x] /login - Login page.
        - [x] /signup - Signup page for new users.
        - [x] /logout - Logout endpoint.
        - [ ] /profile/edit - Edit user profile.
    - Description: Allows users to register, log in, or log out of the portal.
    - Components:
        - [ ] Login: Input fields (email/username, password), "Forgot Password" link, Submit button.
        - [ ] Signup: Input fields (name, email, password, branch/role selection), Submit button.
        - [ ] Profile Edit: Form to edit user details (branch, profile picture, etc.).

3. Dashboard
    - URL: /dashboard
    - Description: Personalized user space. Displays uploaded notes, downloaded materials, and profile stats.
    - Components:
        - [ ] User stats (total uploads, downloads, profile completeness).
        - [ ] Table/Grid of uploaded notes (title, upload date, size, tags, edit options).
        - [ ] Quick actions (Upload a new note, View My Notes, Share Links).
        - [ ] Notifications for new reviews/comments.

4. Notes Upload
    - URL: /upload
    - Description: Allows users (CRs) to upload notes with details like subject, tags, and access control.
    - Components:
        - [ ] File upload input (support for multiple formats: PDF, DOCX, TXT, etc.).
        - [ ] Input fields for:
        - [ ] Title, description, subject, tags.
        - [ ] Access control (public, private, restricted).
        - [ ] Option to add a guide.txt file.
        - [ ] Submit and Reset buttons.

5. Note Browsing
    - URL: /notes
    - Description: Lists all uploaded notes, with options to filter and sort them.
    - Components:
        - [ ] Filters (subject, tags, branch, rating).
        - [ ] Search bar.
        - [ ] Cards/Table to display notes with:
        - [ ] Title, subject, branch, tags.
        - [ ] Download button.
        - [ ] Rating and comments preview.

6. Note Details
    - URL: /notes/<note_id>
    - Description: Displays detailed information about a note, including comments and ratings.
    - Components:
    - Details:
        - [ ] File preview (if supported by the browser).
        - [ ] Title, subject, tags, description, uploaded by, upload date.
        - [ ] Download button.
        - [ ] Ratings and reviews section:
        - [ ] Star rating input.
        - [ ] User reviews.
        - [ ] Commenting system (input box and existing comments).

7. Admin/CR Management
    - URL: /admin
    - Description: Admin/CR panel to manage uploaded notes, users, and settings.
    - Components:
        - [ ] User management table (view/edit users, reset passwords).
        - [ ] Notes management table (view/edit notes).
        - [ ] Analytics dashboard (total uploads/downloads, branch-specific data).

8. Share Notes
    - URL: /notes/<note_id>/share
    - Description: Generates shareable public/private links for notes.
    - Components:
        - [ ] Option to create public/private links.
        - [ ] Generated link with a copy button.
        - [ ] List of users the note has been shared with (if private).

9. Ratings and Reviews
    - URL: /notes/<note_id>/reviews
    - Description: Dedicated page to view all reviews and ratings for a note.
    - Components:
        - [ ] List of user reviews (username, rating, comment).
        - [ ] Pagination for large lists.

10. Backup and Security Settings
    - URL: /settings
    - Description: Allows admin/CR to manage backup and security options.
    - Components:
        - [ ] Backup options:
        - [ ] Manual backup button.
        - [ ] Schedule frequency dropdown.
        - [ ] MFA setup for security:
        - [ ] Toggle MFA.
        - [ ] Generate QR code for app-based MFA.

11. Error Pages
    - URLs:
    - /404 - Not found page.
    - /500 - Server error page.
    - Description: User-friendly error pages for better UX.
    - Components:
        - [ ] Error message.
        - [ ] Navigation link to return to home or dashboard.

12. Optional
    - URL Patterns for Branch-Specific Notes:
        - [ ] /notes/branch/<branch_name> - Filters notes specific to a branch.
    - URL Patterns for User-Specific Data:
        - [ ] /user/<user_id>/notes - Displays notes uploaded by a specific user.
