# TODO: Backend

1. Authentication
    - [x] POST /api/auth/login
      - Authenticate user and return a JWT token.
    - [x] POST /api/auth/signup
      - Create a new user account.
    - [x] POST /api/auth/logout
      - Invalidate the current session or token.
    - [x] POST /api/auth/forgot-password
        - Send a password reset link to the user.
    - [x] POST /api/auth/reset-password
        - Reset the user's password using the token.

2. User Management
    - [ ] GET /api/users/me
        - Fetch the authenticated user's profile details.
    - [ ] PUT /api/users/me
        - Update authenticated user profile (e.g., branch, profile picture).
    - [ ] GET /api/users/<user_id>
        - Fetch another user's public profile (if applicable).

3. Notes Management
    - [ ] GET /api/notes
        - Fetch all notes with optional filters (subject, branch, tags, etc.).
        - Query Params: ?subject=<subject>&tags=<tag>&branch=<branch>&keyword=<keyword>
    - [ ] GET /api/notes/<note_id>
        - Fetch detailed information for a specific note.
    - [ ] POST /api/notes
        - Upload a new note.
    - [ ] PUT /api/notes/<note_id>
        - Edit note metadata (title, tags, description) (CRs only).
    - [ ] DELETE /api/notes/<note_id>
        - Only soft-delete the note (CRs only).

4. File Handling
    - [ ] POST /api/files/upload
        - Upload a file.
        - Supports formats: PDF, DOCX, TXT.
    - [ ] GET /api/files/download/<file_id>
        - Download a file.
    - [ ] GET /api/files/preview/<file_id>
        - Fetch a preview of the file (e.g., thumbnail or first few pages if PDF).
    - [ ] POST /api/files/generate-link/<file_id>
        - Generate a public/private shareable link.

5. Comments & Reviews
    - [ ] POST /api/notes/<note_id>/reviews
        - Add a review for a note (rating and comment).
    - [ ] GET /api/notes/<note_id>/reviews
        - Fetch all reviews for a note.
    - [ ] POST /api/notes/<note_id>/comments
        - Add a comment to a note.
    - [ ] GET /api/notes/<note_id>/comments
        - Fetch all comments for a note.

6. Admin/CR Management
    - [ ] GET /api/admin/stats
        - Fetch portal stats (total notes, total users, top branches, etc.).
    - [ ] GET /api/admin/users
        - Fetch all users for management.
    - [ ] GET /api/admin/notes
        - Fetch all notes for management.
    - [ ] PUT /api/admin/users/<user_id>
        - Update user roles (e.g., make someone a CR).
    - [ ] PUT /api/admin/notes/<note_id>
        - Moderate notes (e.g., block inappropriate content).

7. Backup & Security
    - [ ] POST /api/settings/backup
        - Trigger a manual backup.
    - [ ] GET /api/settings/mfa/setup
        - Fetch MFA setup details (e.g., QR code).
    - [ ] POST /api/settings/mfa/verify
        - Verify MFA setup.
