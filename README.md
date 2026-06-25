# The Jesus Prayer

A simple devotional web application centered around the ancient Christian practice of the Jesus Prayer:

> **"Lord Jesus Christ, Son of God, have mercy on me, a sinner."**

The goal of this project is to provide a quiet, distraction-free space for prayer and contemplation using imagery, gentle animation, and customizable settings.

## Intended Audience

This application is primarily designed for Orthodox Christians who are already familiar with the Jesus Prayer and wish to incorporate it into their daily prayer practice.

Educational resources are provided for visitors who would like to learn more about the history and theology of the Jesus Prayer, and additional educational content may be added in future releases.

## Live Demo

🌐 https://jesusprayer.net

---

## Features

### Prayer Spinner

* Circular prayer graphic inspired by a prayer rope / chotki.
* Click to start rotation.
* Click again to stop rotation.
* Rotation speed is user-configurable.
* Optional automatic rotation on page load.

### Prayer Images

* View devotional images and icons.
* Responsive design scales appropriately for desktop and mobile devices.
* Return to the prayer spinner at any time.

### Theme Support

* Dark Theme
* Light Theme
* Theme preference is saved locally.
* No Flash Of Unstyled Content (FOUC) when reloading.

### Customization

Users can configure:

* Rotation speed
* Automatic rotation on page load
* Glow / shadow effects
* Glow color (light theme)
* Glow color (dark theme)

All settings are stored locally and persist between sessions.

### Responsive Design

The prayer spinner and devotional images automatically scale to fit different screen sizes.

---

## Technology

Built using:

* HTML5
* CSS3
* Vanilla JavaScript
* Local Storage

No frameworks or external dependencies are required.

---

## Design Philosophy

This project intentionally avoids unnecessary complexity.

For a small devotional application, plain HTML, CSS, and JavaScript provide:

* Fast load times
* Minimal dependencies
* Easy deployment
* Long-term maintainability
* Simple offline support

---

## Future Ideas

The following features are currently being explored.

### Progressive Web App (PWA)

* Installable on mobile devices
* Offline support
* App-like experience
* HTTPS hosting

### Android App

Potential packaging using Capacitor to create a native Android application while retaining the existing HTML/CSS/JavaScript codebase.

### Daily Prayer Reminders

* Configurable reminder times
* Local notifications
* Daily prayer prompts

### Audio Support

* Byzantine chant
* Gregorian chant
* Ambient devotional music
* Audio prayer tracks

### Virtual Prayer Rope

One of the most exciting ideas under consideration.

A ring of prayer-rope knots would surround the prayer spinner.

Each completed rotation would advance the prayer count:

```text
Rotation #1  → Knot 1 highlighted
Rotation #2  → Knot 2 highlighted
Rotation #3  → Knot 3 highlighted
...
```

Possible prayer targets:

* 33 prayers
* 50 prayers
* 100 prayers
* 300 prayers

This would transform the spinner from a decorative animation into a visual prayer-tracking tool.

### Wear OS Companion App

A simplified companion application for smartwatches.

Possible features:

* Prayer counter
* Virtual prayer rope
* Haptic feedback
* Session tracking
* Quick-access prayers

The phone application would continue to provide:

* Images
* Audio
* Notifications
* Settings
* Prayer history

while the watch focuses on prayer sessions and counting.

### Prayer History

Optional session tracking:

```text
33 Jesus Prayers
Completed: 2026-06-24
```

Allowing users to review previous prayer sessions.

---

## Status

Active personal project.

The application is functional and currently focused on refining the core prayer experience before adding larger features such as PWA support, prayer-rope tracking, notifications, and companion applications.

---

## License

This project is provided for personal devotional use and experimentation.

Feel free to fork, modify, and adapt for your own prayer practice.
