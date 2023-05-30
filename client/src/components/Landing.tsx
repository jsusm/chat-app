import { A } from "@solidjs/router";

export default function LandingSection() {
  return (
    <section class="overflow-y-visible overflow-x-clip relative">
      <div class="absolute top-1/4 left-1/3 w-screen h-20 rounded-[100%] rotate-12 blur-3xl -z-10 bg-gradient-to-t from-sky-200 to-indigo-400 lg:top-1/4" />
      <div class="absolute bottom-1/4 left-1/4 w-1/4 h-20 rounded-[100%] rotate-[60deg] blur-3xl -z-10 bg-gradient-to-t from-blue-700 to-violet-600 lg:bottom-1/4 opacity-50" />
      <div
        class="mx-auto max-w-screen-xl px-4 py-32 lg:flex h-full lg:items-center"
      >
        <div class="mx-auto max-w-xl text-center">
          <h1 class="bg-gradient-to-t from-slate-800 to-slate-950 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Chat app
          </h1>

          <p class="mt-4 text-slate-800 sm:text-lg/relaxed">
            We believe that communication is the most important thing these days, communicate in real time with whoever you want.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <A
              class="block w-full rounded-md sm:text-lg bg-blue-600 px-6 py-1.5 font-medium text-white drop-shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/signup"
            >
              Sign up
            </A>
            <A
              class="block w-full rounded-md sm:text-lg bg-slate-50 border border-gray-300 px-6 py-1.5 font-medium text-slate-600 drop-shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              href="/signin"
            >
              Sign in
            </A>
          </div>
        </div>
      </div>
    </section>
  )
}
