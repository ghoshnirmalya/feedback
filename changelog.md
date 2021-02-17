# [0.10.0](https://github.com/ghoshnirmalya/feedback/compare/0.9.0...0.10.0) (2021-02-17)

### Bug Fixes

- fixes centering issues for ContentArea ([725ec3e](https://github.com/ghoshnirmalya/feedback/commit/725ec3e926d232756bf4d52fbd9ae269c1b74717))
- fixes height issue of image for ContentArea ([1743282](https://github.com/ghoshnirmalya/feedback/commit/174328205f4e2ffe20416e94ae0f7e790a11912e))

### Features

- adds basic seed data ([04b4863](https://github.com/ghoshnirmalya/feedback/commit/04b4863a3a26b0b520d4e2fa57b367abe51326c4))
- adds border to the selected file ([8377f0c](https://github.com/ghoshnirmalya/feedback/commit/8377f0c10819aa409340a736c7ebe8cc4b08a1b4))
- adds option to delete records ([eaaecca](https://github.com/ghoshnirmalya/feedback/commit/eaaecca45277b1d0af6acde8f60321a92926ae24))
- adds option to send email on signing up ([88ed19b](https://github.com/ghoshnirmalya/feedback/commit/88ed19b1d31a4d243b3f11caa1888fca5db8dc88))
- shows yellow background for selected comment ([6c63d93](https://github.com/ghoshnirmalya/feedback/commit/6c63d93357572505c24c218f4c01c42cf7d2481e))
- updates design for default selection of files ([b36aaa1](https://github.com/ghoshnirmalya/feedback/commit/b36aaa11e042727abc991f4858e8003f95f39fbb))
- updates design for selection ([541b049](https://github.com/ghoshnirmalya/feedback/commit/541b049f3370ea8a9710a0f7d9044c391a86c3da))
- updates design of ProjectStateRadio component ([1ad4a51](https://github.com/ghoshnirmalya/feedback/commit/1ad4a51cb915e810036055db31c7cd8750e1e7b7))

# [0.9.0](https://github.com/ghoshnirmalya/feedback/compare/0.8.0...0.9.0) (2021-02-15)

### Bug Fixes

- fixes authentication issues with reply form ([46ffe8d](https://github.com/ghoshnirmalya/feedback/commit/46ffe8d97ae080b7c10073dd8bd22992fb43da70))
- fixes overflow issues with ContentArea ([4ded0f4](https://github.com/ghoshnirmalya/feedback/commit/4ded0f48f90d14f650858d7418b651a745338a8d))
- fixes switching of project state ([2ab7960](https://github.com/ghoshnirmalya/feedback/commit/2ab7960efc5d4b78343cdbeea66b732eeb7b2b1e))
- hides project details for unauthenticated users ([4c50d3b](https://github.com/ghoshnirmalya/feedback/commit/4c50d3b92a32088f172d9ac947b54563e96f1645))

### Features

- adds the option to mark a comment as resolved/unresolved ([976e8e9](https://github.com/ghoshnirmalya/feedback/commit/976e8e9569aec165f050e376ba38aaee99ef6706))
- fetches all data only once ([3e14717](https://github.com/ghoshnirmalya/feedback/commit/3e14717ef6d68bae0e07c4fa483c75b3c4597921))
- removes node_modules cache for Github actions ([8cf957a](https://github.com/ghoshnirmalya/feedback/commit/8cf957a920b5d0e8e0a613f9050a67e140f95dfe))
- updates design of empty states ([b82608f](https://github.com/ghoshnirmalya/feedback/commit/b82608f194c4abe7d9a005e488ae6ca2538e4b13))

# [0.8.0](https://github.com/ghoshnirmalya/feedback/compare/0.7.1...0.8.0) (2021-02-14)

### Bug Fixes

- fixes issue with getCurrentUser ([abd8381](https://github.com/ghoshnirmalya/feedback/commit/abd8381a520b695856019c467dfff1da90267928))

### Features

- adds enhancements to OAuth ([a59927b](https://github.com/ghoshnirmalya/feedback/commit/a59927b79255cd811001a9610dde3967c2cd812c))
- adds GoogleOAuth strategy ([7b2aa31](https://github.com/ghoshnirmalya/feedback/commit/7b2aa31ed6881e7bfd390606de3b17bde9a2e9fa))
- adds option to add replies to a comment ([c975c57](https://github.com/ghoshnirmalya/feedback/commit/c975c57f607b3b73e2cb7fe83fff317f00ed62a0))
- adds option to create dummy data while signing up ([26c8967](https://github.com/ghoshnirmalya/feedback/commit/26c89676cc38d8a53b85a96a517b254b368097ec))
- adds option to view public projects ([c0c9bf3](https://github.com/ghoshnirmalya/feedback/commit/c0c9bf36a00090fdb703bc2f9e46309f48ddd0a2))
- adds option to view replies ([2089544](https://github.com/ghoshnirmalya/feedback/commit/2089544482077d1c237aefe5ece747b209163e15))
- allows only five files to be uploaded on production mode ([762a4ae](https://github.com/ghoshnirmalya/feedback/commit/762a4aee461d957c514eae0e19ab73f7d5232868))
- converts id to uuid ([a02cd01](https://github.com/ghoshnirmalya/feedback/commit/a02cd019d7928916c69958a1b0385dda6cef8b8e))
- integrates Google Analytics ([f29818a](https://github.com/ghoshnirmalya/feedback/commit/f29818a4fc002320b3dc63dbd506dce7381be4f0))
- moves Imagkit to integrations ([01d5777](https://github.com/ghoshnirmalya/feedback/commit/01d577717cf1a6343eaa04ba68be545f957e85d2))
- refetch currentUser details after 30 minutes ([ec9d773](https://github.com/ghoshnirmalya/feedback/commit/ec9d7738789fdd6b7d8aec55e39d85c8234e4b8b))
- removes web service from Render config ([9dfee23](https://github.com/ghoshnirmalya/feedback/commit/9dfee2393729b95cb3e533389dd0cbeb00ac4512))
- update design of all pages ([4b6e1bd](https://github.com/ghoshnirmalya/feedback/commit/4b6e1bd2b98254cd624108b91f027db0c815070d))
- update design of authentication page ([3347f33](https://github.com/ghoshnirmalya/feedback/commit/3347f33699a2e72b09ebf83c0c1176743bcdeb4d))
- updates authentication redirection logic ([6183988](https://github.com/ghoshnirmalya/feedback/commit/6183988bc4d719386dff4383060cf689acdbec8a))
- updates design for cards ([7f4913b](https://github.com/ghoshnirmalya/feedback/commit/7f4913b87effc83ce65ed0c0b530697abdbfdc2f))
- updates design for error pages ([855f0e2](https://github.com/ghoshnirmalya/feedback/commit/855f0e2ad288551ad97017ce49d57192a3d60168))
- updates design for listing pages ([1ad3acb](https://github.com/ghoshnirmalya/feedback/commit/1ad3acb77c169fa359737f78110887f149ce3bec))
- updates design of all components ([fcfe7ec](https://github.com/ghoshnirmalya/feedback/commit/fcfe7ec5b6ef3a863bd9b11b2b2d7e9546fcd05e))
- updates fallback UI ([67d981d](https://github.com/ghoshnirmalya/feedback/commit/67d981dfe25d5ff2e30af482059b2363e569ea16))
- uses Google OAuth login ([b608f3a](https://github.com/ghoshnirmalya/feedback/commit/b608f3a7dc57a946506b29c9e43174f0f42237da))

## [0.7.1](https://github.com/ghoshnirmalya/feedback/compare/0.7.0...0.7.1) (2021-02-06)

### Bug Fixes

- fixes creation of projects ([35f81ab](https://github.com/ghoshnirmalya/feedback/commit/35f81ab48a13b91ba0794e6552dc3eaecafcea1a))

# [0.7.0](https://github.com/ghoshnirmalya/feedback/compare/0.6.1...0.7.0) (2021-02-06)

### Features

- adds basic boilerplate for teams ([ba7bf0d](https://github.com/ghoshnirmalya/feedback/commit/ba7bf0d2d1446ffc4b990892f8bb990487fee49d))
- adds minor design changes ([8d4e870](https://github.com/ghoshnirmalya/feedback/commit/8d4e870a5894332aa04e0daba98c9f5abed83cd0))
- adds user to teams ([1ef7f2d](https://github.com/ghoshnirmalya/feedback/commit/1ef7f2d5d4580d593e63cbd5940d4a25d51ceff2))
- associates projects with a team ([3ea0f46](https://github.com/ghoshnirmalya/feedback/commit/3ea0f4623c5d43e8029543302ee434c0b672206e))
- shows error message for unauthenticated users ([10e1377](https://github.com/ghoshnirmalya/feedback/commit/10e1377ac2931b9aa16ee63769f30613926db0af))
- shows teams to which the current user belongs to ([607bfb9](https://github.com/ghoshnirmalya/feedback/commit/607bfb97b87af01f2f54500ddfd4ff9960c188bd))

## [0.6.1](https://github.com/ghoshnirmalya/feedback/compare/0.6.0...0.6.1) (2021-02-05)

### Bug Fixes

- fixes name of file ([b3da0ac](https://github.com/ghoshnirmalya/feedback/commit/b3da0ac329a4afe89f8e7db505d06a3f4d5c0ff3))

# [0.6.0](https://github.com/ghoshnirmalya/feedback/compare/0.5.0...0.6.0) (2021-02-05)

### Features

- removes files pages ([61be94a](https://github.com/ghoshnirmalya/feedback/commit/61be94ac124396e65de9a5685f6c667ad9666d15))
- shows date properly ([16abda1](https://github.com/ghoshnirmalya/feedback/commit/16abda13c7976900d302bf73f34219b6df9f084b))
- updates design of auth components ([b7e3f0b](https://github.com/ghoshnirmalya/feedback/commit/b7e3f0b06466ce504b5faab5647e86925996932c))

# [0.5.0](https://github.com/ghoshnirmalya/feedback/compare/0.4.0...0.5.0) (2021-02-05)

### Features

- updates how annotations are shown ([2265532](https://github.com/ghoshnirmalya/feedback/commit/2265532d71fe04d941819d71434ad433d33e0be2))

# [0.4.0](https://github.com/ghoshnirmalya/feedback/compare/0.3.0...0.4.0) (2021-02-04)

### Features

- adds option to add comments ([798d839](https://github.com/ghoshnirmalya/feedback/commit/798d8398d0141397aa470bafe5930faeda019d98))
- adds option to show annotations ([201c9f0](https://github.com/ghoshnirmalya/feedback/commit/201c9f0ede9b2d69412f688638ba6f9bdb881692))
- shows dynamic images in ContentArea ([b738caa](https://github.com/ghoshnirmalya/feedback/commit/b738caa18b921cc8fff3afa6cf139265e339f1b6))

# [0.3.0](https://github.com/ghoshnirmalya/feedback/compare/0.2.0...0.3.0) (2021-01-28)

### Features

- adds association between files and urls ([f1f8764](https://github.com/ghoshnirmalya/feedback/commit/f1f876440cd607e66047084e3c9a3176a4756bce))
- cleans up UI to show list of files for a project ([e5e1d1d](https://github.com/ghoshnirmalya/feedback/commit/e5e1d1d4faf23279c3b5d217bb22053da7963e49))

# [0.2.0](https://github.com/ghoshnirmalya/feedback/compare/0.1.0...0.2.0) (2021-01-27)

### Features

- adds file model ([d3cb65c](https://github.com/ghoshnirmalya/feedback/commit/d3cb65cdff8897f1904befe94bf40aa4e449fd40))
- adds option to create and edit project ([a6f3d61](https://github.com/ghoshnirmalya/feedback/commit/a6f3d6143a712be6d67e27f0a4e9b013eb0a88ea))
- migrates code to Blitz format ([7030326](https://github.com/ghoshnirmalya/feedback/commit/7030326e2ef65b8fe7e8221cc1daa68e9d7f7001))

# [0.1.0](https://github.com/ghoshnirmalya/feedback/compare/0.0.2...0.1.0) (2021-01-08)

### Bug Fixes

- fixes overflow issue with image ([91dbd5f](https://github.com/ghoshnirmalya/feedback/commit/91dbd5fb83c694796dafc026c7700685c23a24ad))

### Features

- adds basic layout ([989f4ea](https://github.com/ghoshnirmalya/feedback/commit/989f4ea5ef1cea77481eb38c5be48d354e2386c0))

## 0.0.2 (2021-01-07)

### Features

- removes Playwright ([a587da4](https://github.com/ghoshnirmalya/feedback/commit/a587da4bb2499f26987edf2f7f7de71dd18034a4))

## 0.0.1 (2021-01-07)

### Features

- adds API route for generating screenshots of a page ([ceb80a4](https://github.com/ghoshnirmalya/feedback/commit/ceb80a48cdabe8a4c2fa6a9160ccd178cd5a2d9d))
- adds Playwright ([fc35b4c](https://github.com/ghoshnirmalya/feedback/commit/fc35b4c95b508e98ed58b3f196777ab56a8153a8))
- bootstraps a Lerna mono-repo project ([cb1cdcf](https://github.com/ghoshnirmalya/feedback/commit/cb1cdcfd4878bc11f969ba4f12b6b751eccacb85))
- uses Playwright-core instead of Playwright ([2e8f616](https://github.com/ghoshnirmalya/feedback/commit/2e8f61681e4ab17963aacbdff349267f4fd19a01))

## 0.0.0 (2021-01-07)

Initial release.
