// Generated with https://tools.w3cub.com/json-schema-to-typescript

/**
 * The application pattern.
 */
export type PatternKind =
  | {
      use: "brownfield"
      [k: string]: unknown
    }
  | {
      use: "isolation"
      options: {
        /**
         * The dir containing the index.html file that contains the secure isolation application.
         */
        dir: string
        [k: string]: unknown
      }
      [k: string]: unknown
    }
/**
 * An URL to open on a Tauri webview window.
 */
export type WindowUrl = string
/**
 * System theme.
 */
export type Theme = "Light" | "Dark"
/**
 * How the window title bar should be displayed on macOS.
 */
export type TitleBarStyle = "Visible" | "Transparent" | "Overlay"
/**
 * Targets to bundle. Each value is case insensitive.
 */
export type BundleTarget = "all" | BundleType[] | BundleType
/**
 * A bundle referenced by tauri-bundler.
 */
export type BundleType =
  | "deb"
  | "appimage"
  | "msi"
  | "nsis"
  | "app"
  | "dmg"
  | "updater"
/**
 * Install modes for the Webview2 runtime. Note that for the updater bundle [`Self::DownloadBootstrapper`] is used.
 *
 * For more information see <https://tauri.app/v1/guides/building/windows>.
 */
export type WebviewInstallMode =
  | {
      type: "skip"
    }
  | {
      type: "downloadBootstrapper"
      /**
       * Instructs the installer to run the bootstrapper in silent mode. Defaults to `true`.
       */
      silent?: boolean
    }
  | {
      type: "embedBootstrapper"
      /**
       * Instructs the installer to run the bootstrapper in silent mode. Defaults to `true`.
       */
      silent?: boolean
    }
  | {
      type: "offlineInstaller"
      /**
       * Instructs the installer to run the installer in silent mode. Defaults to `true`.
       */
      silent?: boolean
    }
  | {
      type: "fixedRuntime"
      /**
       * The path to the fixed runtime to use.
       *
       * The fixed version can be downloaded [on the official website](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section). The `.cab` file must be extracted to a folder and this folder path must be defined on this field.
       */
      path: string
    }
/**
 * The languages to build using WiX.
 */
export type WixLanguage =
  | string
  | string[]
  | {
      [k: string]: WixLanguageConfig
    }
/**
 * Install Modes for the NSIS installer.
 */
export type NSISInstallerMode = "currentUser" | "perMachine" | "both"
/**
 * Filesystem scope definition. It is a list of glob patterns that restrict the API access from the webview.
 *
 * Each pattern can start with a variable that resolves to a system base directory. The variables are: `$AUDIO`, `$CACHE`, `$CONFIG`, `$DATA`, `$LOCALDATA`, `$DESKTOP`, `$DOCUMENT`, `$DOWNLOAD`, `$EXE`, `$FONT`, `$HOME`, `$PICTURE`, `$PUBLIC`, `$RUNTIME`, `$TEMPLATE`, `$VIDEO`, `$RESOURCE`, `$APP`, `$LOG`, `$TEMP`, `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG`.
 */
export type FsAllowlistScope =
  | string[]
  | {
      /**
       * A list of paths that are allowed by this scope.
       */
      allow?: string[]
      /**
       * A list of paths that are not allowed by this scope. This gets precedence over the [`Self::Scope::allow`] list.
       */
      deny?: string[]
      [k: string]: unknown
    }
/**
 * A set of command arguments allowed to be executed by the webview API.
 *
 * A value of `true` will allow any arguments to be passed to the command. `false` will disable all arguments. A list of [`ShellAllowedArg`] will set those arguments as the only valid arguments to be passed to the attached command configuration.
 */
export type ShellAllowedArgs = boolean | ShellAllowedArg[]
/**
 * A command argument allowed to be executed by the webview API.
 */
export type ShellAllowedArg =
  | string
  | {
      /**
       * [regex] validator to require passed values to conform to an expected input.
       *
       * This will require the argument value passed to this variable to match the `validator` regex before it will be executed.
       *
       * [regex]: https://docs.rs/regex/latest/regex/#syntax
       */
      validator: string
    }
/**
 * Shell scope definition. It is a list of command names and associated CLI arguments that restrict the API access from the webview.
 */
export type ShellAllowlistScope = ShellAllowedCommand[]
/**
 * Defines the `shell > open` api scope.
 */
export type ShellAllowlistOpen = boolean | string
/**
 * HTTP API scope definition. It is a list of URLs that can be accessed by the webview when using the HTTP APIs. The scoped URL is matched against the request URL using a glob pattern.
 *
 * Examples: - "https://**": allows all HTTPS urls - "https://*.github.com/tauri-apps/tauri": allows any subdomain of "github.com" with the "tauri-apps/api" path - "https://myapi.service.com/users/*": allows access to any URLs that begins with "https://myapi.service.com/users/"
 */
export type HttpAllowlistScope = string[]
/**
 * A Content-Security-Policy definition. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>.
 */
export type Csp =
  | string
  | {
      [k: string]: CspDirectiveSources
    }
/**
 * A Content-Security-Policy directive source list. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources#sources>.
 */
export type CspDirectiveSources = string | string[]
/**
 * The possible values for the `dangerous_disable_asset_csp_modification` config option.
 */
export type DisabledCspModificationKind = boolean | string[]
/**
 * A URL to an updater server.
 *
 * The URL must use the `https` scheme on production.
 */
export type UpdaterEndpoint = string
/**
 * Install modes for the Windows update.
 */
export type WindowsUpdateInstallMode = "basicUi" | "quiet" | "passive"
/**
 * Defines the URL or assets to embed in the application.
 */
export type AppUrl = WindowUrl | string[]
/**
 * Describes the shell command to run before `tauri dev`.
 */
export type BeforeDevCommand =
  | string
  | {
      /**
       * The script to execute.
       */
      script: string
      /**
       * The current working directory.
       */
      cwd?: string | null
      /**
       * Whether `tauri dev` should wait for the command to finish or not. Defaults to `false`.
       */
      wait?: boolean
      [k: string]: unknown
    }
/**
 * Describes a shell command to be executed when a CLI hook is triggered.
 */
export type HookCommand =
  | string
  | {
      /**
       * The script to execute.
       */
      script: string
      /**
       * The current working directory.
       */
      cwd?: string | null
      [k: string]: unknown
    }

/**
 * The Tauri configuration object. It is read from a file where you can define your frontend assets, configure the bundler, enable the app updater, define a system tray, enable APIs via the allowlist and more.
 *
 * The configuration file is generated by the [`tauri init`](https://tauri.app/v1/api/cli#init) command that lives in your Tauri application source directory (src-tauri).
 *
 * Once generated, you may modify it at will to customize your Tauri application.
 *
 * ## File Formats
 *
 * By default, the configuration is defined as a JSON file named `tauri.conf.json`.
 *
 * Tauri also supports JSON5 and TOML files via the `config-json5` and `config-toml` Cargo features, respectively. The JSON5 file name must be either `tauri.conf.json` or `tauri.conf.json5`. The TOML file name is `Tauri.toml`.
 *
 * ## Platform-Specific Configuration
 *
 * In addition to the default configuration file, Tauri can read a platform-specific configuration from `tauri.linux.conf.json`, `tauri.windows.conf.json`, and `tauri.macos.conf.json` (or `Tauri.linux.toml`, `Tauri.windows.toml` and `Tauri.macos.toml` if the `Tauri.toml` format is used), which gets merged with the main configuration object.
 *
 * ## Configuration Structure
 *
 * The configuration is composed of the following objects:
 *
 * - [`package`](#packageconfig): Package settings - [`tauri`](#tauriconfig): The Tauri config - [`build`](#buildconfig): The build configuration - [`plugins`](#pluginconfig): The plugins config
 *
 * ```json title="Example tauri.config.json file" { "build": { "beforeBuildCommand": "", "beforeDevCommand": "", "devPath": "../dist", "distDir": "../dist" }, "package": { "productName": "tauri-app", "version": "0.1.0" }, "tauri": { "allowlist": { "all": true }, "bundle": {}, "security": { "csp": null }, "updater": { "active": false }, "windows": [ { "fullscreen": false, "height": 600, "resizable": true, "title": "Tauri App", "width": 800 } ] } } ```
 */
export interface Config {
  /**
   * The JSON schema for the Tauri config.
   */
  $schema?: string | null
  /**
   * Package settings.
   */
  package?: PackageConfig
  /**
   * The Tauri configuration.
   */
  tauri?: TauriConfig
  /**
   * The build configuration.
   */
  build?: BuildConfig
  /**
   * The plugins config.
   */
  plugins?: PluginConfig
}
/**
 * The package configuration.
 */
export interface PackageConfig {
  /**
   * App name.
   */
  productName?: string | null
  /**
   * App version. It is a semver version number or a path to a `package.json` file containing the `version` field.
   */
  version?: string | null
}
/**
 * The Tauri configuration object.
 */
export interface TauriConfig {
  /**
   * The pattern to use.
   */
  pattern?: PatternKind
  /**
   * The windows configuration.
   */
  windows?: WindowConfig[]
  /**
   * The CLI configuration.
   */
  cli?: CliConfig | null
  /**
   * The bundler configuration.
   */
  bundle?: BundleConfig
  /**
   * The allowlist configuration.
   */
  allowlist?: AllowlistConfig
  /**
   * Security configuration.
   */
  security?: SecurityConfig
  /**
   * The updater configuration.
   */
  updater?: UpdaterConfig
  /**
   * Configuration for app system tray.
   */
  systemTray?: SystemTrayConfig | null
  /**
   * MacOS private API configuration. Enables the transparent background API and sets the `fullScreenEnabled` preference to `true`.
   */
  macOSPrivateApi?: boolean
}
/**
 * The window configuration object.
 */
export interface WindowConfig {
  /**
   * The window identifier. It must be alphanumeric.
   */
  label?: string
  /**
   * The window webview URL.
   */
  url?: WindowUrl & string
  /**
   * The user agent for the webview
   */
  userAgent?: string | null
  /**
   * Whether the file drop is enabled or not on the webview. By default it is enabled.
   *
   * Disabling it is required to use drag and drop on the frontend on Windows.
   */
  fileDropEnabled?: boolean
  /**
   * Whether or not the window starts centered or not.
   */
  center?: boolean
  /**
   * The horizontal position of the window's top left corner
   */
  x?: number | null
  /**
   * The vertical position of the window's top left corner
   */
  y?: number | null
  /**
   * The window width.
   */
  width?: number
  /**
   * The window height.
   */
  height?: number
  /**
   * The min window width.
   */
  minWidth?: number | null
  /**
   * The min window height.
   */
  minHeight?: number | null
  /**
   * The max window width.
   */
  maxWidth?: number | null
  /**
   * The max window height.
   */
  maxHeight?: number | null
  /**
   * Whether the window is resizable or not.
   */
  resizable?: boolean
  /**
   * The window title.
   */
  title?: string
  /**
   * Whether the window starts as fullscreen or not.
   */
  fullscreen?: boolean
  /**
   * Whether the window will be initially focused or not.
   */
  focus?: boolean
  /**
   * Whether the window is transparent or not.
   *
   * Note that on `macOS` this requires the `macos-private-api` feature flag, enabled under `tauri > macOSPrivateApi`. WARNING: Using private APIs on `macOS` prevents your application from being accepted to the `App Store`.
   */
  transparent?: boolean
  /**
   * Whether the window is maximized or not.
   */
  maximized?: boolean
  /**
   * Whether the window is visible or not.
   */
  visible?: boolean
  /**
   * Whether the window should have borders and bars.
   */
  decorations?: boolean
  /**
   * Whether the window should always be on top of other windows.
   */
  alwaysOnTop?: boolean
  /**
   * Prevents the window contents from being captured by other apps.
   */
  contentProtected?: boolean
  /**
   * If `true`, hides the window icon from the taskbar on Windows and Linux.
   */
  skipTaskbar?: boolean
  /**
   * The initial window theme. Defaults to the system theme. Only implemented on Windows and macOS 10.14+.
   */
  theme?: Theme | null
  /**
   * The style of the macOS title bar.
   */
  titleBarStyle?: TitleBarStyle & string
  /**
   * If `true`, sets the window title to be hidden on macOS.
   */
  hiddenTitle?: boolean
  /**
   * Whether clicking an inactive window also clicks through to the webview on macOS.
   */
  acceptFirstMouse?: boolean
  /**
   * Defines the window [tabbing identifier] for macOS.
   *
   * Windows with matching tabbing identifiers will be grouped together. If the tabbing identifier is not set, automatic tabbing will be disabled.
   *
   * [tabbing identifier]: <https://developer.apple.com/documentation/appkit/nswindow/1644704-tabbingidentifier>
   */
  tabbingIdentifier?: string | null
  /**
   * Defines additional browser arguments on Windows. By default wry passes `--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection` so if you use this method, you also need to disable these components by yourself if you want.
   */
  additionalBrowserArgs?: string | null
}
/**
 * describes a CLI configuration
 */
export interface CliConfig {
  /**
   * Command description which will be shown on the help information.
   */
  description?: string | null
  /**
   * Command long description which will be shown on the help information.
   */
  longDescription?: string | null
  /**
   * Adds additional help information to be displayed in addition to auto-generated help. This information is displayed before the auto-generated help information. This is often used for header information.
   */
  beforeHelp?: string | null
  /**
   * Adds additional help information to be displayed in addition to auto-generated help. This information is displayed after the auto-generated help information. This is often used to describe how to use the arguments, or caveats to be noted.
   */
  afterHelp?: string | null
  /**
   * List of arguments for the command
   */
  args?: CliArg[] | null
  /**
   * List of subcommands of this command
   */
  subcommands?: {
    [k: string]: CliConfig
  } | null
}
/**
 * A CLI argument definition.
 */
export interface CliArg {
  /**
   * The short version of the argument, without the preceding -.
   *
   * NOTE: Any leading `-` characters will be stripped, and only the first non-character will be used as the short version.
   */
  short?: string | null
  /**
   * The unique argument name
   */
  name: string
  /**
   * The argument description which will be shown on the help information. Typically, this is a short (one line) description of the arg.
   */
  description?: string | null
  /**
   * The argument long description which will be shown on the help information. Typically this a more detailed (multi-line) message that describes the argument.
   */
  longDescription?: string | null
  /**
   * Specifies that the argument takes a value at run time.
   *
   * NOTE: values for arguments may be specified in any of the following methods - Using a space such as -o value or --option value - Using an equals and no space such as -o=value or --option=value - Use a short and no space such as -ovalue
   */
  takesValue?: boolean
  /**
   * Specifies that the argument may have an unknown number of multiple values. Without any other settings, this argument may appear only once.
   *
   * For example, --opt val1 val2 is allowed, but --opt val1 val2 --opt val3 is not.
   *
   * NOTE: Setting this requires `takes_value` to be set to true.
   */
  multiple?: boolean
  /**
   * Specifies that the argument may appear more than once. For flags, this results in the number of occurrences of the flag being recorded. For example -ddd or -d -d -d would count as three occurrences. For options or arguments that take a value, this does not affect how many values they can accept. (i.e. only one at a time is allowed)
   *
   * For example, --opt val1 --opt val2 is allowed, but --opt val1 val2 is not.
   */
  multipleOccurrences?: boolean
  /**
   * Specifies how many values are required to satisfy this argument. For example, if you had a `-f <file>` argument where you wanted exactly 3 'files' you would set `number_of_values = 3`, and this argument wouldn't be satisfied unless the user provided 3 and only 3 values.
   *
   * **NOTE:** Does *not* require `multiple_occurrences = true` to be set. Setting `multiple_occurrences = true` would allow `-f <file> <file> <file> -f <file> <file> <file>` where as *not* setting it would only allow one occurrence of this argument.
   *
   * **NOTE:** implicitly sets `takes_value = true` and `multiple_values = true`.
   */
  numberOfValues?: number | null
  /**
   * Specifies a list of possible values for this argument. At runtime, the CLI verifies that only one of the specified values was used, or fails with an error message.
   */
  possibleValues?: string[] | null
  /**
   * Specifies the minimum number of values for this argument. For example, if you had a -f `<file>` argument where you wanted at least 2 'files', you would set `minValues: 2`, and this argument would be satisfied if the user provided, 2 or more values.
   */
  minValues?: number | null
  /**
   * Specifies the maximum number of values are for this argument. For example, if you had a -f `<file>` argument where you wanted up to 3 'files', you would set .max_values(3), and this argument would be satisfied if the user provided, 1, 2, or 3 values.
   */
  maxValues?: number | null
  /**
   * Sets whether or not the argument is required by default.
   *
   * - Required by default means it is required, when no other conflicting rules have been evaluated - Conflicting rules take precedence over being required.
   */
  required?: boolean
  /**
   * Sets an arg that override this arg's required setting i.e. this arg will be required unless this other argument is present.
   */
  requiredUnlessPresent?: string | null
  /**
   * Sets args that override this arg's required setting i.e. this arg will be required unless all these other arguments are present.
   */
  requiredUnlessPresentAll?: string[] | null
  /**
   * Sets args that override this arg's required setting i.e. this arg will be required unless at least one of these other arguments are present.
   */
  requiredUnlessPresentAny?: string[] | null
  /**
   * Sets a conflicting argument by name i.e. when using this argument, the following argument can't be present and vice versa.
   */
  conflictsWith?: string | null
  /**
   * The same as conflictsWith but allows specifying multiple two-way conflicts per argument.
   */
  conflictsWithAll?: string[] | null
  /**
   * Tets an argument by name that is required when this one is present i.e. when using this argument, the following argument must be present.
   */
  requires?: string | null
  /**
   * Sts multiple arguments by names that are required when this one is present i.e. when using this argument, the following arguments must be present.
   */
  requiresAll?: string[] | null
  /**
   * Allows a conditional requirement with the signature [arg, value] the requirement will only become valid if `arg`'s value equals `${value}`.
   */
  requiresIf?: string[] | null
  /**
   * Allows specifying that an argument is required conditionally with the signature [arg, value] the requirement will only become valid if the `arg`'s value equals `${value}`.
   */
  requiredIfEq?: string[] | null
  /**
   * Requires that options use the --option=val syntax i.e. an equals between the option and associated value.
   */
  requireEquals?: boolean | null
  /**
   * The positional argument index, starting at 1.
   *
   * The index refers to position according to other positional argument. It does not define position in the argument list as a whole. When utilized with multiple=true, only the last positional argument may be defined as multiple (i.e. the one with the highest index).
   */
  index?: number | null
}
/**
 * Configuration for tauri-bundler.
 */
export interface BundleConfig {
  /**
   * Whether Tauri should bundle your application or just output the executable.
   */
  active?: boolean
  /**
   * The bundle targets, currently supports ["deb", "appimage", "nsis", "msi", "app", "dmg", "updater"] or "all".
   */
  targets?: BundleTarget & string
  /**
   * The application identifier in reverse domain name notation (e.g. `com.tauri.example`). This string must be unique across applications since it is used in system configurations like the bundle ID and path to the webview data directory. This string must contain only alphanumeric characters (A–Z, a–z, and 0–9), hyphens (-), and periods (.).
   */
  identifier: string
  /**
   * The application's publisher. Defaults to the second element in the identifier string. Currently maps to the Manufacturer property of the Windows Installer.
   */
  publisher?: string | null
  /**
   * The app's icons
   */
  icon?: string[]
  /**
   * App resources to bundle. Each resource is a path to a file or directory. Glob patterns are supported.
   */
  resources?: string[] | null
  /**
   * A copyright string associated with your application.
   */
  copyright?: string | null
  /**
   * The application kind.
   *
   * Should be one of the following: Business, DeveloperTool, Education, Entertainment, Finance, Game, ActionGame, AdventureGame, ArcadeGame, BoardGame, CardGame, CasinoGame, DiceGame, EducationalGame, FamilyGame, KidsGame, MusicGame, PuzzleGame, RacingGame, RolePlayingGame, SimulationGame, SportsGame, StrategyGame, TriviaGame, WordGame, GraphicsAndDesign, HealthcareAndFitness, Lifestyle, Medical, Music, News, Photography, Productivity, Reference, SocialNetworking, Sports, Travel, Utility, Video, Weather.
   */
  category?: string | null
  /**
   * A short description of your application.
   */
  shortDescription?: string | null
  /**
   * A longer, multi-line description of the application.
   */
  longDescription?: string | null
  /**
   * Configuration for the AppImage bundle.
   */
  appimage?: AppImageConfig
  /**
   * Configuration for the Debian bundle.
   */
  deb?: DebConfig
  /**
   * Configuration for the macOS bundles.
   */
  macOS?: MacConfig
  /**
   * A list of—either absolute or relative—paths to binaries to embed with your application.
   *
   * Note that Tauri will look for system-specific binaries following the pattern "binary-name{-target-triple}{.system-extension}".
   *
   * E.g. for the external binary "my-binary", Tauri looks for:
   *
   * - "my-binary-x86_64-pc-windows-msvc.exe" for Windows - "my-binary-x86_64-apple-darwin" for macOS - "my-binary-x86_64-unknown-linux-gnu" for Linux
   *
   * so don't forget to provide binaries for all targeted platforms.
   */
  externalBin?: string[] | null
  /**
   * Configuration for the Windows bundle.
   */
  windows?: WindowsConfig
}
/**
 * Configuration for AppImage bundles.
 */
export interface AppImageConfig {
  /**
   * Include additional gstreamer dependencies needed for audio and video playback. This increases the bundle size by ~15-35MB depending on your build system.
   */
  bundleMediaFramework?: boolean
}
/**
 * Configuration for Debian (.deb) bundles.
 */
export interface DebConfig {
  /**
   * The list of deb dependencies your application relies on.
   */
  depends?: string[] | null
  /**
   * The files to include on the package.
   */
  files?: {
    [k: string]: string
  }
}
/**
 * Configuration for the macOS bundles.
 */
export interface MacConfig {
  /**
   * A list of strings indicating any macOS X frameworks that need to be bundled with the application.
   *
   * If a name is used, ".framework" must be omitted and it will look for standard install locations. You may also use a path to a specific framework.
   */
  frameworks?: string[] | null
  /**
   * A version string indicating the minimum macOS X version that the bundled application supports. Defaults to `10.13`.
   *
   * Setting it to `null` completely removes the `LSMinimumSystemVersion` field on the bundle's `Info.plist` and the `MACOSX_DEPLOYMENT_TARGET` environment variable.
   *
   * An empty string is considered an invalid value so the default value is used.
   */
  minimumSystemVersion?: string | null
  /**
   * Allows your application to communicate with the outside world. It should be a lowercase, without port and protocol domain name.
   */
  exceptionDomain?: string | null
  /**
   * The path to the license file to add to the DMG bundle.
   */
  license?: string | null
  /**
   * Identity to use for code signing.
   */
  signingIdentity?: string | null
  /**
   * Provider short name for notarization.
   */
  providerShortName?: string | null
  /**
   * Path to the entitlements file.
   */
  entitlements?: string | null
}
/**
 * Windows bundler configuration.
 */
export interface WindowsConfig {
  /**
   * Specifies the file digest algorithm to use for creating file signatures. Required for code signing. SHA-256 is recommended.
   */
  digestAlgorithm?: string | null
  /**
   * Specifies the SHA1 hash of the signing certificate.
   */
  certificateThumbprint?: string | null
  /**
   * Server to use during timestamping.
   */
  timestampUrl?: string | null
  /**
   * Whether to use Time-Stamp Protocol (TSP, a.k.a. RFC 3161) for the timestamp server. Your code signing provider may use a TSP timestamp server, like e.g. SSL.com does. If so, enable TSP by setting to true.
   */
  tsp?: boolean
  /**
   * The installation mode for the Webview2 runtime.
   */
  webviewInstallMode?: WebviewInstallMode
  /**
   * Path to the webview fixed runtime to use. Overwrites [`Self::webview_install_mode`] if set.
   *
   * Will be removed in v2, prefer the [`Self::webview_install_mode`] option.
   *
   * The fixed version can be downloaded [on the official website](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section). The `.cab` file must be extracted to a folder and this folder path must be defined on this field.
   */
  webviewFixedRuntimePath?: string | null
  /**
   * Validates a second app installation, blocking the user from installing an older version if set to `false`.
   *
   * For instance, if `1.2.1` is installed, the user won't be able to install app version `1.2.0` or `1.1.5`.
   *
   * The default value of this flag is `true`.
   */
  allowDowngrades?: boolean
  /**
   * Configuration for the MSI generated with WiX.
   */
  wix?: WixConfig | null
  /**
   * Configuration for the installer generated with NSIS.
   */
  nsis?: NsisConfig | null
}
/**
 * Configuration for the MSI bundle using WiX.
 */
export interface WixConfig {
  /**
   * The installer languages to build. See <https://docs.microsoft.com/en-us/windows/win32/msi/localizing-the-error-and-actiontext-tables>.
   */
  language?: WixLanguage & string
  /**
   * A custom .wxs template to use.
   */
  template?: string | null
  /**
   * A list of paths to .wxs files with WiX fragments to use.
   */
  fragmentPaths?: string[]
  /**
   * The ComponentGroup element ids you want to reference from the fragments.
   */
  componentGroupRefs?: string[]
  /**
   * The Component element ids you want to reference from the fragments.
   */
  componentRefs?: string[]
  /**
   * The FeatureGroup element ids you want to reference from the fragments.
   */
  featureGroupRefs?: string[]
  /**
   * The Feature element ids you want to reference from the fragments.
   */
  featureRefs?: string[]
  /**
   * The Merge element ids you want to reference from the fragments.
   */
  mergeRefs?: string[]
  /**
   * Disables the Webview2 runtime installation after app install.
   *
   * Will be removed in v2, prefer the [`WindowsConfig::webview_install_mode`] option.
   */
  skipWebviewInstall?: boolean
  /**
   * The path to the license file to render on the installer.
   *
   * Must be an RTF file, so if a different extension is provided, we convert it to the RTF format.
   */
  license?: string | null
  /**
   * Create an elevated update task within Windows Task Scheduler.
   */
  enableElevatedUpdateTask?: boolean
  /**
   * Path to a bitmap file to use as the installation user interface banner. This bitmap will appear at the top of all but the first page of the installer.
   *
   * The required dimensions are 493px × 58px.
   */
  bannerPath?: string | null
  /**
   * Path to a bitmap file to use on the installation user interface dialogs. It is used on the welcome and completion dialogs. The required dimensions are 493px × 312px.
   */
  dialogImagePath?: string | null
}
/**
 * Configuration for a target language for the WiX build.
 */
export interface WixLanguageConfig {
  /**
   * The path to a locale (`.wxl`) file. See <https://wixtoolset.org/documentation/manual/v3/howtos/ui_and_localization/build_a_localized_version.html>.
   */
  localePath?: string | null
}
/**
 * Configuration for the Installer bundle using NSIS.
 */
export interface NsisConfig {
  /**
   * The path to the license file to render on the installer.
   */
  license?: string | null
  /**
   * The path to a bitmap file to display on the header of installers pages.
   *
   * The recommended dimensions are 150px x 57px.
   */
  headerImage?: string | null
  /**
   * The path to a bitmap file for the Welcome page and the Finish page.
   *
   * The recommended dimensions are 164px x 314px.
   */
  sidebarImage?: string | null
  /**
   * The path to an icon file used as the installer icon.
   */
  installerIcon?: string | null
  /**
   * Whether the installation will be for all users or just the current user.
   */
  installMode?: NSISInstallerMode & string
  /**
   * A list of installer languages. By default the OS language is used. If the OS language is not in the list of languages, the first language will be used. To allow the user to select the language, set `display_language_selector` to `true`.
   *
   * See <https://github.com/kichik/nsis/tree/9465c08046f00ccb6eda985abbdbf52c275c6c4d/Contrib/Language%20files> for the complete list of languages.
   */
  languages?: string[] | null
  /**
   * Whether to display a language selector dialog before the installer and uninstaller windows are rendered or not. By default the OS language is selected, with a fallback to the first language in the `languages` array.
   */
  displayLanguageSelector?: boolean
}
/**
 * Allowlist configuration. The allowlist is a translation of the [Cargo allowlist features](https://docs.rs/tauri/latest/tauri/#cargo-allowlist-features).
 *
 * # Notes
 *
 * - Endpoints that don't have their own allowlist option are enabled by default. - There is only "opt-in", no "opt-out". Setting an option to `false` has no effect.
 *
 * # Examples
 *
 * - * [`"app-all": true`](https://tauri.app/v1/api/config/#appallowlistconfig.all) will make the [hide](https://tauri.app/v1/api/js/app#hide) endpoint be available regardless of whether `hide` is set to `false` or `true` in the allowlist.
 */
export interface AllowlistConfig {
  /**
   * Use this flag to enable all API features.
   */
  all?: boolean
  /**
   * File system API allowlist.
   */
  fs?: FsAllowlistConfig
  /**
   * Window API allowlist.
   */
  window?: WindowAllowlistConfig
  /**
   * Shell API allowlist.
   */
  shell?: ShellAllowlistConfig
  /**
   * Dialog API allowlist.
   */
  dialog?: DialogAllowlistConfig
  /**
   * HTTP API allowlist.
   */
  http?: HttpAllowlistConfig
  /**
   * Notification API allowlist.
   */
  notification?: NotificationAllowlistConfig
  /**
   * Global shortcut API allowlist.
   */
  globalShortcut?: GlobalShortcutAllowlistConfig
  /**
   * OS allowlist.
   */
  os?: OsAllowlistConfig
  /**
   * Path API allowlist.
   */
  path?: PathAllowlistConfig
  /**
   * Custom protocol allowlist.
   */
  protocol?: ProtocolAllowlistConfig
  /**
   * Process API allowlist.
   */
  process?: ProcessAllowlistConfig
  /**
   * Clipboard APIs allowlist.
   */
  clipboard?: ClipboardAllowlistConfig
  /**
   * App APIs allowlist.
   */
  app?: AppAllowlistConfig
}
/**
 * Allowlist for the file system APIs.
 */
export interface FsAllowlistConfig {
  /**
   * The access scope for the filesystem APIs.
   */
  scope?: FsAllowlistScope
  /**
   * Use this flag to enable all file system API features.
   */
  all?: boolean
  /**
   * Read file from local filesystem.
   */
  readFile?: boolean
  /**
   * Write file to local filesystem.
   */
  writeFile?: boolean
  /**
   * Read directory from local filesystem.
   */
  readDir?: boolean
  /**
   * Copy file from local filesystem.
   */
  copyFile?: boolean
  /**
   * Create directory from local filesystem.
   */
  createDir?: boolean
  /**
   * Remove directory from local filesystem.
   */
  removeDir?: boolean
  /**
   * Remove file from local filesystem.
   */
  removeFile?: boolean
  /**
   * Rename file from local filesystem.
   */
  renameFile?: boolean
  /**
   * Check if path exists on the local filesystem.
   */
  exists?: boolean
}
/**
 * Allowlist for the window APIs.
 */
export interface WindowAllowlistConfig {
  /**
   * Use this flag to enable all window API features.
   */
  all?: boolean
  /**
   * Allows dynamic window creation.
   */
  create?: boolean
  /**
   * Allows centering the window.
   */
  center?: boolean
  /**
   * Allows requesting user attention on the window.
   */
  requestUserAttention?: boolean
  /**
   * Allows setting the resizable flag of the window.
   */
  setResizable?: boolean
  /**
   * Allows changing the window title.
   */
  setTitle?: boolean
  /**
   * Allows maximizing the window.
   */
  maximize?: boolean
  /**
   * Allows unmaximizing the window.
   */
  unmaximize?: boolean
  /**
   * Allows minimizing the window.
   */
  minimize?: boolean
  /**
   * Allows unminimizing the window.
   */
  unminimize?: boolean
  /**
   * Allows showing the window.
   */
  show?: boolean
  /**
   * Allows hiding the window.
   */
  hide?: boolean
  /**
   * Allows closing the window.
   */
  close?: boolean
  /**
   * Allows setting the decorations flag of the window.
   */
  setDecorations?: boolean
  /**
   * Allows setting the always_on_top flag of the window.
   */
  setAlwaysOnTop?: boolean
  /**
   * Allows preventing the window contents from being captured by other apps.
   */
  setContentProtected?: boolean
  /**
   * Allows setting the window size.
   */
  setSize?: boolean
  /**
   * Allows setting the window minimum size.
   */
  setMinSize?: boolean
  /**
   * Allows setting the window maximum size.
   */
  setMaxSize?: boolean
  /**
   * Allows changing the position of the window.
   */
  setPosition?: boolean
  /**
   * Allows setting the fullscreen flag of the window.
   */
  setFullscreen?: boolean
  /**
   * Allows focusing the window.
   */
  setFocus?: boolean
  /**
   * Allows changing the window icon.
   */
  setIcon?: boolean
  /**
   * Allows setting the skip_taskbar flag of the window.
   */
  setSkipTaskbar?: boolean
  /**
   * Allows grabbing the cursor.
   */
  setCursorGrab?: boolean
  /**
   * Allows setting the cursor visibility.
   */
  setCursorVisible?: boolean
  /**
   * Allows changing the cursor icon.
   */
  setCursorIcon?: boolean
  /**
   * Allows setting the cursor position.
   */
  setCursorPosition?: boolean
  /**
   * Allows ignoring cursor events.
   */
  setIgnoreCursorEvents?: boolean
  /**
   * Allows start dragging on the window.
   */
  startDragging?: boolean
  /**
   * Allows opening the system dialog to print the window content.
   */
  print?: boolean
}
/**
 * Allowlist for the shell APIs.
 */
export interface ShellAllowlistConfig {
  /**
   * Access scope for the binary execution APIs. Sidecars are automatically enabled.
   */
  scope?: ShellAllowlistScope
  /**
   * Use this flag to enable all shell API features.
   */
  all?: boolean
  /**
   * Enable binary execution.
   */
  execute?: boolean
  /**
   * Enable sidecar execution, allowing the JavaScript layer to spawn a sidecar command, an executable that is shipped with the application. For more information see <https://tauri.app/v1/guides/building/sidecar>.
   */
  sidecar?: boolean
  /**
   * Open URL with the user's default application.
   */
  open?: ShellAllowlistOpen & boolean
}
/**
 * A command allowed to be executed by the webview API.
 */
export interface ShellAllowedCommand {
  /**
   * The name for this allowed shell command configuration.
   *
   * This name will be used inside of the webview API to call this command along with any specified arguments.
   */
  name: string
  /**
   * The command name. It can start with a variable that resolves to a system base directory. The variables are: `$AUDIO`, `$CACHE`, `$CONFIG`, `$DATA`, `$LOCALDATA`, `$DESKTOP`, `$DOCUMENT`, `$DOWNLOAD`, `$EXE`, `$FONT`, `$HOME`, `$PICTURE`, `$PUBLIC`, `$RUNTIME`, `$TEMPLATE`, `$VIDEO`, `$RESOURCE`, `$APP`, `$LOG`, `$TEMP`, `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG`.
   */
  cmd?: string
  /**
   * The allowed arguments for the command execution.
   */
  args?: ShellAllowedArgs & boolean
  /**
   * If this command is a sidecar command.
   */
  sidecar?: boolean
  [k: string]: unknown
}
/**
 * Allowlist for the dialog APIs.
 */
export interface DialogAllowlistConfig {
  /**
   * Use this flag to enable all dialog API features.
   */
  all?: boolean
  /**
   * Allows the API to open a dialog window to pick files.
   */
  open?: boolean
  /**
   * Allows the API to open a dialog window to pick where to save files.
   */
  save?: boolean
  /**
   * Allows the API to show a message dialog window.
   */
  message?: boolean
  /**
   * Allows the API to show a dialog window with Yes/No buttons.
   */
  ask?: boolean
  /**
   * Allows the API to show a dialog window with Ok/Cancel buttons.
   */
  confirm?: boolean
}
/**
 * Allowlist for the HTTP APIs.
 */
export interface HttpAllowlistConfig {
  /**
   * The access scope for the HTTP APIs.
   */
  scope?: HttpAllowlistScope
  /**
   * Use this flag to enable all HTTP API features.
   */
  all?: boolean
  /**
   * Allows making HTTP requests.
   */
  request?: boolean
}
/**
 * Allowlist for the notification APIs.
 */
export interface NotificationAllowlistConfig {
  /**
   * Use this flag to enable all notification API features.
   */
  all?: boolean
}
/**
 * Allowlist for the global shortcut APIs.
 */
export interface GlobalShortcutAllowlistConfig {
  /**
   * Use this flag to enable all global shortcut API features.
   */
  all?: boolean
}
/**
 * Allowlist for the OS APIs.
 */
export interface OsAllowlistConfig {
  /**
   * Use this flag to enable all OS API features.
   */
  all?: boolean
}
/**
 * Allowlist for the path APIs.
 */
export interface PathAllowlistConfig {
  /**
   * Use this flag to enable all path API features.
   */
  all?: boolean
}
/**
 * Allowlist for the custom protocols.
 */
export interface ProtocolAllowlistConfig {
  /**
   * The access scope for the asset protocol.
   */
  assetScope?: FsAllowlistScope
  /**
   * Use this flag to enable all custom protocols.
   */
  all?: boolean
  /**
   * Enables the asset protocol.
   */
  asset?: boolean
}
/**
 * Allowlist for the process APIs.
 */
export interface ProcessAllowlistConfig {
  /**
   * Use this flag to enable all process APIs.
   */
  all?: boolean
  /**
   * Enables the relaunch API.
   */
  relaunch?: boolean
  /**
   * Dangerous option that allows macOS to relaunch even if the binary contains a symlink.
   *
   * This is due to macOS having less symlink protection. Highly recommended to not set this flag unless you have a very specific reason too, and understand the implications of it.
   */
  relaunchDangerousAllowSymlinkMacos?: boolean
  /**
   * Enables the exit API.
   */
  exit?: boolean
}
/**
 * Allowlist for the clipboard APIs.
 */
export interface ClipboardAllowlistConfig {
  /**
   * Use this flag to enable all clipboard APIs.
   */
  all?: boolean
  /**
   * Enables the clipboard's `writeText` API.
   */
  writeText?: boolean
  /**
   * Enables the clipboard's `readText` API.
   */
  readText?: boolean
}
/**
 * Allowlist for the app APIs.
 */
export interface AppAllowlistConfig {
  /**
   * Use this flag to enable all app APIs.
   */
  all?: boolean
  /**
   * Enables the app's `show` API.
   */
  show?: boolean
  /**
   * Enables the app's `hide` API.
   */
  hide?: boolean
}
/**
 * Security configuration.
 */
export interface SecurityConfig {
  /**
   * The Content Security Policy that will be injected on all HTML files on the built application. If [`dev_csp`](#SecurityConfig.devCsp) is not specified, this value is also injected on dev.
   *
   * This is a really important part of the configuration since it helps you ensure your WebView is secured. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>.
   */
  csp?: Csp | null
  /**
   * The Content Security Policy that will be injected on all HTML files on development.
   *
   * This is a really important part of the configuration since it helps you ensure your WebView is secured. See <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>.
   */
  devCsp?: Csp | null
  /**
   * Freeze the `Object.prototype` when using the custom protocol.
   */
  freezePrototype?: boolean
  /**
   * Disables the Tauri-injected CSP sources.
   *
   * At compile time, Tauri parses all the frontend assets and changes the Content-Security-Policy to only allow loading of your own scripts and styles by injecting nonce and hash sources. This stricts your CSP, which may introduce issues when using along with other flexing sources.
   *
   * This configuration option allows both a boolean and a list of strings as value. A boolean instructs Tauri to disable the injection for all CSP injections, and a list of strings indicates the CSP directives that Tauri cannot inject.
   *
   * **WARNING:** Only disable this if you know what you are doing and have properly configured the CSP. Your application might be vulnerable to XSS attacks without this Tauri protection.
   */
  dangerousDisableAssetCspModification?: DisabledCspModificationKind & boolean
}
/**
 * The Updater configuration object.
 */
export interface UpdaterConfig {
  /**
   * Whether the updater is active or not.
   */
  active?: boolean
  /**
   * Display built-in dialog or use event system if disabled.
   */
  dialog?: boolean
  /**
   * The updater endpoints. TLS is enforced on production.
   *
   * The updater URL can contain the following variables: - {{current_version}}: The version of the app that is requesting the update - {{target}}: The operating system name (one of `linux`, `windows` or `darwin`). - {{arch}}: The architecture of the machine (one of `x86_64`, `i686`, `aarch64` or `armv7`).
   *
   * # Examples - "https://my.cdn.com/latest.json": a raw JSON endpoint that returns the latest version and download links for each platform. - "https://updates.app.dev/{{target}}?version={{current_version}}&arch={{arch}}": a dedicated API with positional and query string arguments.
   */
  endpoints?: UpdaterEndpoint[] | null
  /**
   * Signature public key.
   */
  pubkey?: string
  /**
   * The Windows configuration for the updater.
   */
  windows?: UpdaterWindowsConfig
}
/**
 * The updater configuration for Windows.
 */
export interface UpdaterWindowsConfig {
  /**
   * Additional arguments given to the NSIS or WiX installer.
   */
  installerArgs?: string[]
  /**
   * The installation mode for the update on Windows. Defaults to `passive`.
   */
  installMode?: WindowsUpdateInstallMode & string
}
/**
 * Configuration for application system tray icon.
 */
export interface SystemTrayConfig {
  /**
   * Path to the default icon to use on the system tray.
   */
  iconPath: string
  /**
   * A Boolean value that determines whether the image represents a [template](https://developer.apple.com/documentation/appkit/nsimage/1520017-template?language=objc) image on macOS.
   */
  iconAsTemplate?: boolean
  /**
   * A Boolean value that determines whether the menu should appear when the tray icon receives a left click on macOS.
   */
  menuOnLeftClick?: boolean
  /**
   * Title for MacOS tray
   */
  title?: string | null
}
/**
 * The Build configuration object.
 */
export interface BuildConfig {
  /**
   * The binary used to build and run the application.
   */
  runner?: string | null
  /**
   * The path to the application assets or URL to load in development.
   *
   * This is usually an URL to a dev server, which serves your application assets with live reloading. Most modern JavaScript bundlers provides a way to start a dev server by default.
   *
   * See [vite](https://vitejs.dev/guide/), [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) and [sirv](https://github.com/lukeed/sirv) for examples on how to set up a dev server.
   */
  devPath?: AppUrl & string
  /**
   * The path to the application assets or URL to load in production.
   *
   * When a path relative to the configuration file is provided, it is read recursively and all files are embedded in the application binary. Tauri then looks for an `index.html` file unless you provide a custom window URL.
   *
   * You can also provide a list of paths to be embedded, which allows granular control over what files are added to the binary. In this case, all files are added to the root and you must reference it that way in your HTML files.
   *
   * When an URL is provided, the application won't have bundled assets and the application will load that URL by default.
   */
  distDir?: AppUrl & string
  /**
   * A shell command to run before `tauri dev` kicks in.
   *
   * The TAURI_PLATFORM, TAURI_ARCH, TAURI_FAMILY, TAURI_PLATFORM_VERSION, TAURI_PLATFORM_TYPE and TAURI_DEBUG environment variables are set if you perform conditional compilation.
   */
  beforeDevCommand?: BeforeDevCommand | null
  /**
   * A shell command to run before `tauri build` kicks in.
   *
   * The TAURI_PLATFORM, TAURI_ARCH, TAURI_FAMILY, TAURI_PLATFORM_VERSION, TAURI_PLATFORM_TYPE and TAURI_DEBUG environment variables are set if you perform conditional compilation.
   */
  beforeBuildCommand?: HookCommand | null
  /**
   * A shell command to run before the bundling phase in `tauri build` kicks in.
   *
   * The TAURI_PLATFORM, TAURI_ARCH, TAURI_FAMILY, TAURI_PLATFORM_VERSION, TAURI_PLATFORM_TYPE and TAURI_DEBUG environment variables are set if you perform conditional compilation.
   */
  beforeBundleCommand?: HookCommand | null
  /**
   * Features passed to `cargo` commands.
   */
  features?: string[] | null
  /**
   * Whether we should inject the Tauri API on `window.__TAURI__` or not.
   */
  withGlobalTauri?: boolean
}
/**
 * The plugin configs holds a HashMap mapping a plugin name to its configuration object.
 */
export interface PluginConfig {
  [k: string]: unknown
}
