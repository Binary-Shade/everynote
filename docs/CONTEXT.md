# Context Analysis for EveryNote App Development

## Project Overview

EveryNote is a cross-platform note-taking app for iOS and Android built with Expo. The app requires authentication, note management with a rich text editor, and offline-first functionality with cloud sync.

## Technology Stack Requirements

- **Frontend**: Expo SDK (latest stable)
- **Backend**: Next.js with tRPC (within Turborepo)
- **Database**:
  - Local: Expo SQLite (offline-first)
  - Cloud: PostgreSQL with Drizzle ORM
  - Sync: PowerSync for synchronization
- **UI Library**: react-native-reusables (optional, but must match design)
- **Authentication**: Better-Auth for Google OAuth
- **Code Structure**: T3 Turborepo starter template
- **Language**: TypeScript

## Step-by-Step Implementation Plan

### 1. Setup Project Structure

1. Clone the T3 Turborepo starter: `git clone https://github.com/Bekacru/create-t3-turbo`
2. Set up Expo app within the monorepo
3. Install required dependencies:
   - `expo-sqlite` or `expo-sqlite-orm` for local storage
   - PowerSync for cloud sync
   - Better-Auth for Google OAuth
   - 10tap-editor for rich text editing
   - react-native-reusables (if needed for UI)

### 2. Authentication Implementation

1. Create authentication screen with:
   - Google login button (functional with Better-Auth)
   - Apple login button (placeholder)
   - Terms of Service and Privacy Policy notice
2. Implement OAuth flow:
   - Handle successful authentication
   - Store user session
   - Redirect to home page after login
3. Set up error handling for auth failures

### 3. Home Page & Note Management

1. Implement the main note-taking interface:
   - 10tap-editor for rich text editing
   - Category selectors at the top
   - Placeholder UI elements for:
     - Search functionality
     - Calendar view
     - Profile section
2. Create note CRUD operations:
   - Create new notes
   - Edit existing notes
   - Delete notes
   - View note list

### 4. Database & Sync Implementation

1. Design database schema for:
   - Users (from authentication)
   - Notes (content, metadata, categories)
   - Sync status tracking
2. Set up local SQLite database with Expo
3. Configure PowerSync for cloud synchronization:
   - Sign up for PowerSync account
   - Configure sync rules
   - Implement conflict resolution
4. Create Drizzle ORM models for PostgreSQL

### 5. API & State Management

1. Implement tRPC routers for:
   - Authentication endpoints
   - Note operations
   - Sync status checks
2. Set up state management:
   - React Context or Zustand for global state
   - Optimistic UI updates for offline operations
3. Implement proper error handling for API calls

### 6. UI Implementation

1. Create pixel-perfect UI matching provided designs
2. Implement clean light mode experience
3. Ensure responsive layout for both iOS and Android
4. Add loading states and empty states

### 7. Testing & Optimization

1. Test offline functionality
2. Verify sync behavior when connection is restored
3. Optimize database queries
4. Check performance on both platforms

## Key Components to Implement

1. **Auth Screen Components**:

   - GoogleSignInButton.tsx
   - AppleSignInButton.tsx (placeholder)
   - TermsAndPolicyNotice.tsx

2. **Home Screen Components**:

   - NoteEditor.tsx (using 10tap-editor)
   - CategorySelector.tsx
   - SearchBar.tsx (placeholder)
   - CalendarButton.tsx (placeholder)
   - ProfileButton.tsx (placeholder)

3. **Database Models**:

   - User.model.ts
   - Note.model.ts
   - SyncStatus.model.ts

4. **API Routes**:
   - auth.router.ts
   - notes.router.ts
   - sync.router.ts

## Evaluation Criteria Focus Areas

1. **Code Organization**:

   - Clean separation of concerns
   - Proper module structure
   - Reusable components

2. **Technology Implementation**:

   - Proper use of PowerSync
   - Correct Better-Auth integration
   - Effective tRPC API design

3. **Type Safety**:

   - Comprehensive TypeScript types
   - Type-safe API contracts
   - Type-safe database models

4. **State Management**:

   - Efficient state updates
   - Offline state handling
   - Sync state management

5. **Error Handling**:
   - Auth error scenarios
   - Sync conflict resolution
   - Network error recovery

## Additional Requirements

- Implement proper logging for debugging
- Include basic unit tests for critical components
- Document setup instructions in README.md
- Ensure all dependencies are properly versioned

## Timeline Suggestions

1. Day 1-2: Project setup and authentication
2. Day 3-4: Note editor and basic functionality
3. Day 5: Database and sync implementation
4. Day 6: UI polish and testing
5. Day 7: Final optimizations and documentation

Would you like me to elaborate on any specific part of this implementation plan?
