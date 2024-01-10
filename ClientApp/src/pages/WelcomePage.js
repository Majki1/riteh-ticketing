//Welcome Page
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';


const Welcome = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  useEffect ( () => {
    //TODO access cookie data(many node.modules errors)
    const token = Cookies.get('jwtToken');

    if (token) {
      try {
        const decodedData = jwt.decode(token);

        setFirstName(decodedData.firstName);
        setLastName(decodedData.lastName);
        console.log('Success');
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.log('No token found in the cookie.');
    }
  }, []);

  

    return(
        <>
          <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className='justify-content-start'>
                <h1 className="text-5xl bg-gradient-to-r from-green-400 to-blue-500 inline-block text-transparent bg-clip-text p-2 font-bold">Dobro došli {FirstName + LastName}</h1>
                <p className="py-6 px-2 text-white">RiTeh ticketing sustav</p>
                <Link className="btn bg-gradient-to-r text-white from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500" to= '/Tickets'>Ticket</Link>
              </div>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">Date</th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">Email</th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">State</th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr class="hover:bg-gray-50">
                  <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
                  <td class="px-6 py-4">Nov.4 2022</td>
                  <td class="px-6 py-4">helen@sailboatui.com</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Paid
                    </span>
                  </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" class="text-primary-700">Edit</a></td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
                  <td class="px-6 py-4">Nov.4 2022</td>
                  <td class="px-6 py-4">helen@sailboatui.com</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Paid
                    </span>
                  </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" class="text-primary-700">Edit</a></td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
                  <td class="px-6 py-4">Nov.4 2022</td>
                  <td class="px-6 py-4">helen@sailboatui.com</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                      Canceled
                    </span>
                  </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" class="text-primary-700">Edit</a></td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
                  <td class="px-6 py-4">Nov.4 2022</td>
                  <td class="px-6 py-4">helen@sailboatui.com</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Paid
                    </span>
                  </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" class="text-primary-700">Edit</a></td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <th class="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
                  <td class="px-6 py-4">Nov.4 2022</td>
                  <td class="px-6 py-4">helen@sailboatui.com</td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                      Paid
                    </span>
                  </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" class="text-primary-700">Edit</a></td>
                </tr>
              </tbody>
            </table>
          </div>

        </>
    );
};

export default Welcome;