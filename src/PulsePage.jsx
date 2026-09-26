import SpotifyCard from "./SpotifyCard";
import { C } from "./tokens";
import { Mono, SectionHead, Page } from "./ui";

const MUSIC_CATEGORIES = [
  {
    name: "Pop",
    songs: [
      { title: "Eyes Closed", artist: "Imagine Dragons", spotify: "https://open.spotify.com/track/7xDd7gl6AGgpiOz5trz4dM?si=07d0ada0892c4381", previewUrl: "/previews/pop/midnight-city.mp3" },
      { title: "Blinding Lights", artist: "The Weeknd", spotify: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b", previewUrl: "/previews/pop/blinding-lights.mp3" },
      { title: "Fantasy", artist: "Kali Uchis,Don Toliver", spotify: "https://open.spotify.com/track/1dvqHhLNccePPBHq11TW7v?si=d8b40dca8f824abf", previewUrl: "/previews/pop/levitating.mp3" },
      { title: "Watermelon Sugar", artist: "Harry Styles", spotify: "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY", previewUrl: "/previews/pop/watermelon-sugar.mp3" },
      { title: "Persuasive", artist: "Doechii,SZA", spotify: "https://open.spotify.com/track/67v2UHujFruxWrDmjPYxD6?si=da631ebfbf674ddb", previewUrl: "/previews/pop/dont-start-now.mp3" },
    ],
  },
  {
    name: "Kenyan",
    songs: [
      { title: "Mungu Pekee", artist: "Christina Shusho", spotify: "https://open.spotify.com/search/Mungu+Pekee", previewUrl: "/previews/kenyan/mungu-pekee.mp3" },
      { title: "Niko Sawa", artist: "Khaligraph Jones", spotify: "https://open.spotify.com/search/Niko+Sawa", previewUrl: "/previews/kenyan/niko-sawa.mp3" },
      { title: "Tafadhali", artist: "Sauti Sol", spotify: "https://open.spotify.com/search/Tafadhali", previewUrl: "/previews/kenyan/tafadhali.mp3" },
      { title: "Mama", artist: "Sanaipei Tande", spotify: "https://open.spotify.com/search/Mama+Sanaipei", previewUrl: "/previews/kenyan/mama.mp3" },
      { title: "Kiboko Changu", artist: "Jua Cali", spotify: "https://open.spotify.com/search/Kiboko+Changu", previewUrl: "/previews/kenyan/kiboko-changu.mp3" },
    ],
  },
  {
    name: "Hip Hop",
    songs: [
      { title: "SICKO MODE", artist: "Travis Scott", spotify: "https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h?si=7730627208c0476a" },
      { title: "God's Plan", artist: "Drake", spotify: "https://open.spotify.com/track/6DCZcZ3Fq7r4Q4vH6Rv8Kq", previewUrl: "/previews/hiphop/gods-plan.mp3" },
      { title: "HUMBLE.", artist: "Kendrick Lamar", spotify: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS?si=41a0436c81bf4df3", previewUrl: "/previews/hiphop/humble.mp3" },
      { title: "Mo Bamba", artist: "Sheck Wes", spotify: "https://open.spotify.com/track/6tYQqB6T5w4w5r7w8x9z0A", previewUrl: "/previews/hiphop/mo-bamba.mp3" },
      { title: "Lucid Dreams", artist: "Juice WRLD", spotify: "https://open.spotify.com/track/67a0mDgFlYXRznyyImBbJu?si=b6e9052ba7d54270", previewUrl: "/previews/hiphop/lucid-dreams.mp3" },
    ],
  },
  {
    name: "R&B",
    songs: [
      { title: "Earned It", artist: "The Weeknd", spotify: "https://open.spotify.com/track/3u1S9Y7w4r6t7y8u9i0o1p", previewUrl: "/previews/rnb/earned-it.mp3" },
      { title: "Thinkin Bout You", artist: "Frank Ocean", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rnb/thinkin-bout-you.mp3" },
      { title: "Adorn", artist: "Miguel", spotify: "https://open.spotify.com/search/Adorn+Miguel", previewUrl: "/previews/rnb/adorn.mp3" },
      { title: "P.Y.T.", artist: "Michael Jackson", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rnb/pyt.mp3" },
      { title: "Best Part", artist: "Daniel Caesar", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rnb/best-part.mp3" },
    ],
  },
  {
    name: "Afrobeats",
    songs: [
      { title: "Calm Down", artist: "Rema", spotify: "https://open.spotify.com/track/0tCgFjM7q8w9X0Y1Z2A3B4", previewUrl: "/previews/afrobeats/calm-down.mp3" },
      { title: "Love Nwantiti", artist: "CKay", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/afrobeats/love-nwantiti.mp3" },
      { title: "Essence", artist: "Wizkid ft. Tems", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/afrobeats/essence.mp3" },
      { title: "Peru", artist: "Fireboy DML", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/afrobeats/peru.mp3" },
      { title: "Rush", artist: "Ayra Starr", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/afrobeats/rush.mp3" },
    ],
  },
  {
    name: "Electronic",
    songs: [
      { title: "Titanium", artist: "David Guetta ft. Sia", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/electronic/titanium.mp3" },
      { title: "Levels", artist: "Avicii", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/electronic/levels.mp3" },
      { title: "Wake Me Up", artist: "Avicii", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/electronic/wake-me-up.mp3" },
      { title: "Don't You Worry Child", artist: "Swedish House Mafia", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/electronic/dont-you-worry-child.mp3" },
      { title: "Clarity", artist: "Zedd ft. Foxes", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/electronic/clarity.mp3" },
    ],
  },
  {
    name: "Reggae",
    songs: [
      { title: "One Love", artist: "Bob Marley", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/reggae/one-love.mp3" },
      { title: "Buffalo Soldier", artist: "Bob Marley", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/reggae/buffalo-soldier.mp3" },
      { title: "Redemption Song", artist: "Bob Marley", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/reggae/redemption-song.mp3" },
      { title: "Is This Love", artist: "Bob Marley", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/reggae/is-this-love.mp3" },
      { title: "Three Little Birds", artist: "Bob Marley", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/reggae/three-little-birds.mp3" },
    ],
  },
  {
    name: "Rock",
    songs: [
      { title: "Bohemian Rhapsody", artist: "Queen", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rock/bohemian-rhapsody.mp3" },
      { title: "Hotel California", artist: "Eagles", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rock/hotel-california.mp3" },
      { title: "Stairway to Heaven", artist: "Led Zeppelin", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rock/stairway-to-heaven.mp3" },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rock/sweet-child-o-mine.mp3" },
      { title: "Back in Black", artist: "AC/DC", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/rock/back-in-black.mp3" },
    ],
  },
  {
    name: "Jazz",
    songs: [
      { title: "Take Five", artist: "Dave Brubeck", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/jazz/take-five.mp3" },
      { title: "So What", artist: "Miles Davis", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/jazz/so-what.mp3" },
      { title: "My Favorite Things", artist: "John Coltrane", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/jazz/my-favorite-things.mp3" },
      { title: "Feeling Good", artist: "Nina Simone", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/jazz/feeling-good.mp3" },
      { title: "Autumn Leaves", artist: "Bill Evans", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/jazz/autumn-leaves.mp3" },
    ],
  },
  {
    name: "Classical",
    songs: [
      { title: "Four Seasons - Spring", artist: "Vivaldi", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/classical/four-seasons.mp3" },
      { title: "Moonlight Sonata", artist: "Beethoven", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/classical/moonlight-sonata.mp3" },
      { title: "Canon in D", artist: "Pachelbel", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/classical/canon-in-d.mp3" },
      { title: "Clair de Lune", artist: "Debussy", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/classical/clair-de-lune.mp3" },
      { title: "Symphony No. 5", artist: "Beethoven", spotify: "https://open.spotify.com/track/5X65RcZ9Z3f2j9VfW6v8Xq", previewUrl: "/previews/classical/symphony-no-5.mp3" },
    ],
  },
];

export default function MusicPage() {
  return (
    <Page offset>
      <section id="pulse" className="edn-section" style={{ paddingTop: 60 }}>
        <div className="edn-wrap">
          <SectionHead n="08" label="PULSE" title="Pulse —" em="a music browser build.">
            A self-directed build: category browsing with Spotify previews, kept light enough to load
            on the same connections everything else here is built for.
          </SectionHead>

          <div style={{ display: "grid", gap: 44 }}>
            {MUSIC_CATEGORIES.map((category) => (
              <div key={category.name}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, borderBottom: `1px solid ${C.hairline}`, paddingBottom: 10, marginBottom: 18 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.03em", margin: 0, color: C.ink }}>{category.name}</h3>
                  <Mono color={C.muted} size={11}>{String(category.songs.length).padStart(2, "0")} TRACKS</Mono>
                </div>
                <div className="edn-music-grid">
                  {category.songs.map((song) => (
                    <SpotifyCard key={song.title} song={song} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
