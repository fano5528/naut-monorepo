"use client";
import { useEffect, useState, Fragment } from "react";
import Text from "../text/Text";
import Link from "../link/Link";
import { CogIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

export default function LevittBlock(props: {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  title: string;
  description: string;
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
  edit: boolean;
  reference: any;
}) {
  const [day, setDay] = useState(props.day);
  const [month, setMonth] = useState(props.month);
  const [year, setYear] = useState(props.year);
  const [hour, setHour] = useState(props.hour);
  const [minute, setMinute] = useState(props.minute);
  const date: any = new Date(year, month - 1, day, hour, minute);

  const [open, setOpen] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [time, setTime] = useState(0);

  function calculateTime() {
    setTime((prev) => prev + 1);
  }

  let interval: NodeJS.Timeout;

  useEffect(() => {
    const initialTimeUntilDate = Math.max(date - Date.now(), 0);
    const initialSeconds = Math.floor((initialTimeUntilDate / 1000) % 60);
    setSeconds(initialSeconds);
    const initialMinutes = Math.floor((initialTimeUntilDate / 1000 / 60) % 60);
    setMinutes(initialMinutes);
    const initialHours = Math.floor(
      (initialTimeUntilDate / (1000 * 60 * 60)) % 24
    );
    setHours(initialHours);
    const initialDays = Math.floor(
      initialTimeUntilDate / (1000 * 60 * 60 * 24)
    );
    setDays(initialDays);

    interval = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds == 59) {
      if (minutes == 0) {
        if (hours == 0) {
            setDays((prev) => prev - 1);
            setHours(23);
            setMinutes(59);
            setSeconds(59);
        } else {
          setHours((prev) => prev - 1);
          setMinutes(59);
          setSeconds(59);
        }
      } else {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      }
    }
  }, [time]);

  const recalculate = () => {
    const initialTimeUntilDate = Math.max(date - Date.now(), 0);
    const initialSeconds = Math.floor((initialTimeUntilDate / 1000) % 60);
    setSeconds(initialSeconds);
    const initialMinutes = Math.floor((initialTimeUntilDate / 1000 / 60) % 60);
    setMinutes(initialMinutes);
    const initialHours = Math.floor(
      (initialTimeUntilDate / (1000 * 60 * 60)) % 24
    );
    setHours(initialHours);
    const initialDays = Math.floor(
      initialTimeUntilDate / (1000 * 60 * 60 * 24)
    );
    setDays(initialDays);
    setOpen(false);
  };

  return (
    <>
      <input type="hidden" value={day} name={props.reference.day} />
      <input type="hidden" value={month} name={props.reference.month} />
      <input type="hidden" value={year} name={props.reference.year} />
      <input type="hidden" value={hour} name={props.reference.hour} />
      <input type="hidden" value={minute} name={props.reference.minute} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CogIcon
                        className="h-6 w-6 text-[#2adf94]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Editar fecha
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col items-start">
                        <p className="text-sm text-gray-500">
                          Aquí, puedes escoger la fecha y hora de finalización
                          del contador.
                        </p>
                        <label className="mt-10 text-xs text-gray-900">
                          Año
                        </label>
                        <input
                          type="number"
                          className="border border-text rounded w-full p-2 mt-1 bg-white text-gray-900"
                          defaultValue={year}
                          onChange={(e) => setYear(Number(e.target.value))}
                        />
                        <label className="mt-5 text-xs text-gray-900">
                          Mes
                        </label>
                        <input
                          type="number"
                          className="border border-text rounded w-full mt-1 p-2 bg-white text-gray-900"
                          defaultValue={month}
                          onChange={(e) => setMonth(Number(e.target.value))}
                        />
                        <label className="mt-5 text-xs text-gray-900">
                          Día
                        </label>
                        <input
                          type="number"
                          className="border border-text rounded w-full mt-1 p-2 bg-white text-gray-900"
                          defaultValue={day}
                          onChange={(e) => setDay(Number(e.target.value))}
                        />
                        <label className="mt-5 text-xs text-gray-900">
                          Hora
                        </label>
                        <input
                          type="number"
                          className="border border-text rounded w-full mt-1 p-2 bg-white text-gray-900"
                          defaultValue={hour}
                          onChange={(e) => setHour(Number(e.target.value))}
                        />
                        <label className="mt-5 text-xs text-gray-900">
                          Minuto
                        </label>
                        <input
                          type="number"
                          className="border border-text rounded w-full mt-1 p-2 bg-white text-gray-900"
                          defaultValue={minute}
                          onChange={(e) => setMinute(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#2adf94] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2adf94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => recalculate()}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="mt-24 sm:mt-32 flex justify-center gap-10 flex-col lg:flex-row items-center lg:px-10">
        <div className="max-w-lg px-10 sm:px-0">
          <Text
            className="text-3xl font-bold tracking-tight sm:text-4xl w-full text-color1"
            name={props.reference.title}
            edit={props.edit}
          >
            {props.title}
          </Text>
          <Text
            className="mt-6 text-lg tracking-tight leading-normal text-text w-full mx-auto"
            name={props.reference.description}
            edit={props.edit}
          >
            {props.description}
          </Text>
          {props.isCta && (
            <Link
              className="inline-block w-auto mt-6 rounded-md bg-color1 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
              href={props.ctaLink!}
              textName={props.reference.ctaText}
              linkName={props.reference.ctaLink}
              edit={props.edit}
            >
              {props.ctaText}
            </Link>
          )}
        </div>
        <div className="relative overflow-visible flex gap-5 bg-text lg:max-w-2xl items-center justify-center text-white p-8 pt-9 lg:rounded-md shadow-md w-full lg:w-auto">
          {props.edit && (
            <div
              className="cursor-pointer bg-[#2adf94] absolute left-0 top-0 p-2 rounded-t-md hover:bg-[#20d589] text-white text-xs -mt-8"
              onClick={() => setOpen(true)}
            >
              <CogIcon className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
          )}

          <div>
            <span className="countdown text-5xl">
              <span className="days text-white font-semibold"></span>
            </span>
            días
          </div>
          <div>
            <span className="countdown text-5xl">
              <span className="hours text-white font-semibold"></span>
            </span>
            horas
          </div>
          <div>
            <span className="countdown text-5xl">
              <span className="minutes text-white font-semibold"></span>
            </span>
            minutos
          </div>
          <div>
            <span className="countdown text-5xl">
              <span className="seconds text-white font-semibold"></span>
            </span>
            segundos
          </div>
        </div>
        <style jsx>
          {`
            .seconds {
              --value: ${seconds};
            }

            .minutes {
              --value: ${minutes};
            }

            .hours {
              --value: ${hours};
            }

            .days {
              --value: ${days};
            }
          `}
        </style>
      </div>
    </>
  );
}
