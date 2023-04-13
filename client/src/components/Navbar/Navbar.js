// from example https://tailwindui.com/components/application-ui/navigation/navbars
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';

import FormModel from './FormModel/FormModel';
import SearchBar from './SearchBar';
import logo from '../../sharing.png';

// const navigation = [
//   { name: "Posts", current: true },
//   // { name: "Feed", current: false },
// ];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ search, setSearch, handleSearchSubmit }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );
    const dispatch = useDispatch();

    // console.log(user);

    useEffect(() => {
        const token = user?.token;

        // check if jwt expired
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < Date.now()) handleLogOut();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogOut = () => {
        dispatch({ type: LOGOUT });
        window.location.reload();
        setUser(null);
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            {/* Mobile menu button*/}
                            {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div> */}
                            <div className="sm:flex-1 ml-3 sm:ml-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <a href="/">
                                        {' '}
                                        <img
                                            className="block lg:hidden h-10 w-auto"
                                            src={logo}
                                            alt="ProjectShare"
                                        />
                                    </a>
                                    <a href="/">
                                        <img
                                            className="hidden lg:block h-10 w-auto"
                                            src={logo}
                                            alt="ProjectShare"
                                        />
                                    </a>
                                    <a href="/">
                                        <img
                                            className="hidden lg:block h-10 w-auto"
                                            src={logo}
                                            alt="ProjectShare"
                                        />
                                    </a>
                                    <a href="/">
                                        <img
                                            className="hidden lg:block h-10 w-auto"
                                            src={logo}
                                            alt="ProjectShare"
                                        />
                                    </a>
                                </div>
                                {/* <div className="hidden sm:flex items-center sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                key={item.name}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? 'page'
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                            {user && (
                                <SearchBar
                                    search={search}
                                    setSearch={setSearch}
                                    handleSearchSubmit={handleSearchSubmit}
                                />
                            )}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                {user ? (
                                    <Menu as="div" className="ml-3 relative">
                                        <div className="flex flex-row">
                                            <div className="hidden sm:flex text-white items-center mr-2 sm:mr-3">
                                                {user?.result.name}
                                            </div>

                                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={
                                                        user?.result.imageUrl ||
                                                        'https://i.imgur.com/B7sl8c4.jpg'
                                                    }
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100'
                                                                    : '',
                                                                'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                            )}
                                                        >
                                                            Your Profile
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100'
                                                                    : '',
                                                                'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                            )}
                                                        >
                                                            Settings
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100'
                                                                    : '',
                                                                'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                            )}
                                                            onClick={
                                                                handleLogOut
                                                            }
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <FormModel></FormModel>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="button"
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium w-full"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
                </>
            )}
        </Disclosure>
    );
}
