# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

## [Unreleased]

- /

---

## [Released]

## [1.5.0] - 2020-06-24

### Added
- ablity to set multiple afk channels ([#14](https://github.com/RLNT/sinus-staff-list/issues/14))
- manual command to remove a user from the stafflist/databse ([#13](https://github.com/RLNT/sinus-staff-list/issues/13))

### Changed
- group priority going from top to bottom ([#17](https://github.com/RLNT/sinus-staff-list/pull/17))
- increased performance by cancelling loops on result


## [1.3.0] - 2020-05-28

### Added
- away status ([#4](https://github.com/RLNT/sinus-staff-list/pull/4))
  - possibility to detect muted, deaf and away clients
  - afk room detection
- configuration guide ([here](CONFIGURATION.md))

### Changed
- global variable handling
- script loading event and waiting for backend
- refactored a lot of code
- performance increase by handling client lists different


## [1.2.0] - 2020-05-25

### Added
- group assigment listeners ([#3](https://github.com/RLNT/sinus-staff-list/issues/3))
  - description is now updated when a staff group is added or removed
- database validation
  - config changes while the bot was offline are now recognized
- template formatting ([#1](https://github.com/RLNT/sinus-staff-list/issues/1))

### Removed
- unnecessary checks

### Fixed
- move event checking for the wrong output of the staff group detection function


## [1.1.0] - 2020-05-22

### Added
- more explanation to the config how to configure the script and how it works

### Changed
- main script function to use placeholder instead of SinusBot
- extracted member sort function to get more performance and reduce unnecessary checks
- only groups with stored members are shown now


## [1.0.0] - 2020-05-22

- initial release

---

<!-- Links -->
[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/

<!-- Versions -->
[Unreleased]: https://github.com/RLNT/sinus-staff-list/compare/v1.0.0...HEAD
[Released]: https://github.com/RLNT/sinus-staff-list/releases
[1.5.0]: https://github.com/RLNT/sinus-staff-list/compare/v1.3.0..v1.5.0
[1.3.0]: https://github.com/RLNT/sinus-staff-list/compare/v1.2.0..v1.3.0
[1.2.0]: https://github.com/RLNT/sinus-staff-list/compare/v1.1.0..v1.2.0
[1.1.0]: https://github.com/RLNT/sinus-staff-list/compare/v1.0.0..v1.1.0
[1.0.0]: https://github.com/RLNT/sinus-staff-list/releases/v1.0.0
