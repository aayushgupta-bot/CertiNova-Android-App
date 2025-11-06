# Android APK Generation Setup Guide

Your Azure Certification Quiz app has been successfully configured for Capacitor and Android development. Follow these steps to generate the APK:

## Prerequisites Setup

### 1. Install Java 17 (Required for Android Development)
- Download and install Java 17 from [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or [OpenJDK](https://jdk.java.net/17/)
- Set JAVA_HOME environment variable to point to Java 17 installation
- Add Java 17 bin directory to your PATH

### 2. Install Android Studio
- Download from [https://developer.android.com/studio](https://developer.android.com/studio)
- During installation, make sure to install:
  - Android SDK
  - Android SDK Platform-Tools
  - Android Virtual Device (AVD)

### 3. Set Environment Variables
Add these to your system environment variables:
```
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
```

Add to PATH:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

## Build Commands

Once the prerequisites are installed, use these commands in the project root:

### Build Web App and Sync
```powershell
npm run cap:build
```

### Open in Android Studio
```powershell
npm run cap:android
```

### Alternative: Command Line Build
```powershell
cd android
.\gradlew assembleDebug
```

## APK Location
After successful build, the APK will be located at:
```
android\app\build\outputs\apk\debug\app-debug.apk
```

## Project Structure
```
Azure/
├── android/                 # Native Android project
├── capacitor.config.ts     # Capacitor configuration
├── dist/                   # Built web app
└── src/                    # React source code
```

## Troubleshooting

### Java Version Issues
If you see "Unsupported class file major version" errors:
1. Ensure Java 17 is installed and set as default
2. Restart your terminal/command prompt
3. Verify with `java -version`

### Android SDK Issues
If Android SDK is not found:
1. Open Android Studio
2. Go to File > Settings > Appearance & Behavior > System Settings > Android SDK
3. Note the SDK Location and set ANDROID_HOME to that path

### Build Errors
If you encounter build errors:
1. Try `.\gradlew clean` followed by `.\gradlew assembleDebug`
2. Check Android Studio for any missing SDK components
3. Ensure all required Android API levels are installed

## Generated APK Features
Your APK will include:
- Offline quiz functionality
- Native Android performance
- Local storage for progress
- Responsive design optimized for mobile