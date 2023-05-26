import { A } from "@solidjs/router"
export default function Home() {
  return (
    <>
      <section class="bg-gray-50">
        <div
          class="mx-auto max-w-screen-xl px-4 py-32 lg:flex h-screen lg:items-center"
        >
          <div class="mx-auto max-w-xl text-center">
            <h1 class="bg-gradient-to-r from-slate-800 to-slate-950 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Chat app
            </h1>

            <p class="mt-4 text-slate-800 sm:text-xl/relaxed">
              We believe that communication is the most important thing these days, communicate in real time with whoever you want.
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <A
                class="block w-full rounded-md sm:text-lg bg-blue-600 px-12 py-3 font-medium text-white drop-shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/get-started"
              >
                Sign up
              </A>
              <A
                class="block w-full rounded-md sm:text-lg bg-slate-50 border border-gray-300 px-12 py-3 font-medium text-slate-600 drop-shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                href="/about"
              >
                Sign in
              </A>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
