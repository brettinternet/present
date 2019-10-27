export enum Theme {
  BEIGE = "beige",
  BLACK = "black",
  BLOOD = "blood",
  LEAGUE = "league",
  MOON = "moon",
  NIGHT = "night",
  SERIF = "serif",
  SIMPLE = "simple",
  SKY = "sky",
  SOLARIZED = "solarized",
  WHITE = "white",
}

export interface Config {
  /**
   * Display presentation control arrows
   * @default true
   */
  controls?: boolean

  /**
   * Help the user learn the controls by providing hints, for example by
   * bouncing the down arrow when they first encounter a vertical slide
   * @default true
   */
  controlsTutorial?: boolean

  /**
   * Determines where controls appear, "edges" or "bottom-right"
   * @default 'bottom-right'
   */
  //
  controlsLayout?: "bottom-right" | "edges"

  /**
   * Visibility rule for backwards navigation arrows; "faded", "hidden"
   * or "visible"
   * @default 'faded'
   */
  controlsBackArrows?: "faded" | "hidden" | "visible"

  /**
   * Display a presentation progress bar
   * @default true
   */
  progress?: boolean

  /**
   * Display the page number of the current slide
   * @default false
   */
  slideNumber?: boolean

  /**
   * Add the current slide number to the URL hash so that reloading the
   * page/copying the URL will return you to the same slide
   * @default false
   */
  hash?: boolean

  /**
   * Push each slide change to the browser history. Implies `hash: true`
   * @default false
   */
  history?: boolean

  /**
   * Enable keyboard shortcuts for navigation
   * @default true
   */
  keyboard?: boolean

  /**
   * Enable the slide overview mode
   * @default true
   */
  overview?: boolean

  /**
   * Vertical centering of slides
   * @default true
   */
  center?: boolean

  /**
   * Enables touch navigation on devices with touch input
   * @default true
   */
  touch?: boolean

  /**
   * Loop the presentation
   * @default false
   */
  loop?: boolean

  /**
   * Change the presentation direction to be RTL
   * @default false
   */
  rtl?: boolean

  /**
   * See https://github.com/hakimel/reveal.js/#navigation-mode
   * @default 'default'
   */
  navigationMode?: "default"

  /**
   * Randomizes the order of slides each time the presentation loads
   * @default false
   */
  shuffle?: boolean

  /**
   * Turns fragments on and off globally
   * @default true
   */
  fragments?: boolean

  /**
   * Flags whether to include the current fragment in the URL,
   * so that reloading brings you to the same fragment position
   * @default false
   */
  fragmentInURL?: boolean

  /**
   * Flags if the presentation is running in an embedded mode,
   * i.e. contained within a limited portion of the screen
   * @default false
   */
  embedded?: boolean

  /**
   * Flags if we should show a help overlay when the questionmark
   * key is pressed
   * @default true
   */
  help?: boolean

  /**
   * Flags if speaker notes should be visible to all viewers
   * @default false
   */
  showNotes?: boolean

  /**
   * Global override for autoplaying embedded media (video/audio/iframe)
   * - null: Media will only autoplay if data-autoplay is present
   * - true: All media will autoplay, regardless of individual setting
   * - false: No media will autoplay, regardless of individual setting
   * @default null
   */
  autoPlayMedia?: boolean | null

  /**
   * Global override for preloading lazy-loaded iframes
   * - null: Iframes with data-src AND data-preload will be loaded when within
   *    the viewDistance, iframes with only data-src will be loaded when visible
   * - true: All iframes with data-src will be loaded when within the viewDistance
   * - false: All iframes with data-src will be loaded only when visible
   * @default null
   */
  preloadIframes?: boolean | null

  /**
   * Number of milliseconds between automatically proceeding to the
   * next slide, disabled when set to 0, this value can be overwritten
   * by using a data-autoslide attribute on your slides
   * @default 0
   */
  autoSlide?: number

  /**
   * Stop auto-sliding after user input
   * @default true
   */
  autoSlideStoppable?: boolean

  /**
   * Use this method for navigation when auto-sliding
   * @default `Reveal.navigateNext`
   */
  autoSlideMethod?: string // Reveal.navigateNext

  /**
   * Specify the average time in seconds that you think you will spend
   * presenting each slide. This is used to show a pacing timer in the
   * speaker view
   * @default 120
   */
  defaultTiming?: number

  /**
   * Enable slide navigation via mouse wheel
   * @default false
   */
  mouseWheel?: boolean

  /**
   * Hide cursor if inactive
   * @default true
   */
  hideInactiveCursor?: boolean

  /**
   * Time before the cursor is hidden (in ms)
   * @default 5000
   */
  hideCursorTime?: number

  /**
   * Hides the address bar on mobile devices
   * @default true
   */
  hideAddressBar?: boolean

  /**
   * Opens links in an iframe preview overlay
   * Add `data-preview-link` and `data-preview-link="false"` to customise each link
   * individually
   * @default false
   */
  previewLinks?: boolean

  /**
   * Transition style
   * @default 'slide'
   */
  transition?: "none" | "fade" | "slide" | "convex" | "concave" | "zoom"

  /**
   * Transition speed
   * @default 'default'
   */
  transitionSpeed?: "default" | "fast" | "slow"

  /**
   * Transition style for full page slide backgrounds
   * @default 'fade'
   */
  backgroundTransition?:
    | "none"
    | "fade"
    | "slide"
    | "convex"
    | "concave"
    | "zoom"

  /**
   * Number of slides away from the current that are visible
   * @default 3
   */
  viewDistance?: number

  /**
   * Parallax background image
   * e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
   * @default ""
   */
  parallaxBackgroundImage?: string

  /**
   * Parallax background size\
   * CSS syntax, e.g. "2100px 900px"
   * @default ""
   */
  parallaxBackgroundSize?: string

  /**
   * Number of pixels to move the parallax background per slide
   * - Calculated automatically unless specified
   * - Set to 0 to disable movement along an axis
   * @default null
   */
  parallaxBackgroundHorizontal?: number

  /**
   * Number of pixels to move the parallax background per slide
   * - Calculated automatically unless specified
   * - Set to 0 to disable movement along an axis
   * @default null
   */
  parallaxBackgroundVertical?: number

  /**
   * The display mode that will be used to show slides
   * @default 'block'
   */
  display?: string
}
