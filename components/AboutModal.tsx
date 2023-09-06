import Link from "next/link"
export const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div id="aboutModal" tabIndex={-1} aria-hidden="false" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              About this tool
            </h3>
            <button onClick={() => onClose()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6 overflow-y-auto font-serif">
            <h3>What is this tool?</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The new <Link className="font-bold" href="https://www.edinburgh.gov.uk/downloads/file/32060/short-term-lets-policy" target="__blank">regularitons</Link> in Edinburgh
              require people operating short term lets (AirBnBs etc) to apply for a liscence from the city.

              This site allows you to view those applications on a map and see their status
            </p>
            <h3>Where is the data from?</h3>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Edinburgh council maintins a list of the active applications in this <Link className='font-bold' href="https://www.edinburgh.gov.uk/downloads/file/32198/short-term-lets" target="__blank">spreadsheet</Link>
            </p>
            <h3>How often will the data update?</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This site will pull in new data from the published spreadsheet every hour. I don't know how
              often the city intends to updat the spreadsheet.
            </p>
            <h3>Who made this?</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Hi, my name is Stuart Lynn and I am an engineer and data scientist who is interested in all things
              Edinburgh and the urban landscape in general.

              You can find me on mastaton as <Link className='font-bold' href="https://mastodon.scot/@soporificoctopus" target="__blank">@soporificoctopus@mastodon.scot</Link>
              <br />
              <br />
              You can also shoot me an email to <Link className='font-bold' href="mailto: soporificoctopusprotocol@protonmail.com" target="__blank">soporificoctopusprotocol@protonmail.com</Link>
            </p>
            <h3>Something seems wrong on the site, what should I do?</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              It probably is, I built this thing in about 48 hours and the data source is fairly brittle. If you see anything wrong email me or ping me on mastodon.
            </p>

            <h3>Can I help with the site?</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              It's open source baby! You can contribute if you like at <Link className="font-bold" href="https://github.com/stuartlynn/stl_application_viewer" target="__blank">https://github.com/stuartlynn/stl_application_viewer</Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  )

}
