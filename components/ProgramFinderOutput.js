import React, { useState } from 'react';
import DefaultButton from './DefaultButton';
import Modal from './Modal';

function ProgramFinderOutput({ data, visible }) {
  const eligibleRows = data.filter((row) => row.tag === 'Eligible');
  const ineligibleRows = data.filter((row) => row.tag === 'Ineligible');
  const [modalVisibility, setModalVisibility] = useState(false);

  if (!visible) {
    return null;
  }
  if (!data || data.length === 0) {
    return (
      <div className="w-full ">
        <div className="text-xl pb-2 font-black items-center  ">
          Programs you may be eligible for:
        </div>
        <div className=" flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-white overflow-hidden">
          <p className="my-8 mx-auto items-center text-center">
            No programs available
          </p>
        </div>
      </div>
    );
  }

  const handleSignUpClick = (url) => {
    window.open(url, '_blank').focus(); // This will navigate to the specified URL
  };
  return (
    <div className="w-full ">
      <div className="text-xl pb-2 font-black items-center  ">
        Programs you may be eligible for:
      </div>
      {eligibleRows.length > 0 ? (
        eligibleRows.map((row, index) => (
          <div
            key={index}
            className=" flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-white overflow-hidden"
          >
            <div
              className="h-auto
           flex flex-col p-4 w-1/3 sm:w-1/4 items-center align-middle "
              id="imageContainer"
            >
              <img
                className="max-h-20 max-w-20 object-contain"
                src={row['Image URL'] || '/HumEnergyLogo.svg'}
              ></img>
            </div>
            <div className="p-2 sm:p-4 w-3/4 sm:w-1/2">
              <div className="font-bold">
                {row['Program Name'] ||
                  ` ${row['Utility/CCA']} ${row['DERs needed']} Program`}
              </div>
              <div>
                Utility/CCA:{' '}
                {row['Utility/CCA'] || (
                  <span className="italic">Info Unavailable</span>
                )}
              </div>
              <div>
                Program Type:{' '}
                {row['Program Type'] || (
                  <span className="italic">Info Unavailable</span>
                )}
              </div>
              <div>
                Eligible Manufacturers:{' '}
                {Object.entries(row['Eligible Manufacturers']).map(
                  ([type, manufacturers]) => (
                    <div key={type}>
                      <h2 className="font-bold">{type}</h2>
                      <ul>
                        {manufacturers.map((manufacturer) => (
                          <li key={manufacturer}>{manufacturer}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
              <div>
                Eligible devices:{' '}
                {
                  row['DERs needed'] ? (
                    row['DERs needed']
                      .split(',') // Splitting by comma
                      .map(
                        (item) =>
                          item
                            .trim() // Trimming whitespace from each item
                            .split(' ') // Splitting each item into words
                            .map((word) => {
                              // Check for special patterns like 'A/C'
                              if (
                                word === 'A/C' ||
                                word === 'EV' ||
                                word === 'EVs'
                              ) {
                                return word;
                              } else {
                                // Capitalize the first letter of other words
                                return (
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                                );
                              }
                            })
                            .join(' ') // Joining the words back together
                      )
                      .sort() // Sorting alphabetically
                      .join(', ') // Joining back with comma and space
                  ) : (
                    <span className="italic">Info Unavailable</span>
                  ) // Fallback if 'DERs needed' is not available
                }
              </div>

              {row['Enrolling'] === 'Yes' &&
              row['Self-serve'] === 'Self-serve' ? (
                <DefaultButton
                  className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Sign Up
                </DefaultButton>
              ) : row['Enrolling'] === 'Yes' &&
                (row['Self-serve'] === 'Via developer' ||
                  row['Self-serve'] === 'Via installer') ? (
                <div className="sm:hidden">
                  <p className="italic mb-2 mt-2">
                    Sign up via developer / installer
                  </p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : row['Enrolling'] === 'Yes' &&
                row['Self-serve'] === 'Invite only' ? (
                <div className="sm:hidden">
                  <p className="italic mb-2 mt-2">Invite only </p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : row['Enrolling'] === 'Yes' &&
                ![
                  'Self-serve',
                  'Invite only',
                  'Via developer',
                  'Via installer',
                ].includes(row['Self-serve']) ? (
                <div className="sm:hidden">
                  <p className="italic mb-2 mt-2">
                    {`Sign up:  ${row['Self-serve']}`}
                  </p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : row['Enrolling'] != 'Yes' && row['Status'] === 'Active' ? (
                <DefaultButton className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none ">
                  Enrollment Closed
                </DefaultButton>
              ) : row['Status'] === 'Ended' ? (
                <DefaultButton className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none">
                  Enrollment Closed
                </DefaultButton>
              ) : row['Status'] === 'Planned' ? (
                <div className="sm:hidden">
                  <p className="italic mt-2 mb-2">Coming Soon</p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : null}
            </div>

            {row['Enrolling'] === 'Yes' &&
            row['Self-serve'] === 'Self-serve' ? (
              <DefaultButton
                className="hidden sm:w-1/4 mx-4 px-4 py-1 sm:py-2 sm:block"
                onClick={() => handleSignUpClick(row['Program URL'])}
              >
                Sign Up
              </DefaultButton>
            ) : row['Enrolling'] === 'Yes' &&
              row['Self-serve'] === 'Invite only' ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center m-4 ">
                <p className="italic text-center mb-2">Invite only </p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : row['Enrolling'] === 'Yes' &&
              (row['Self-serve'] === 'Via developer' ||
                row['Self-serve'] === 'Via installer') ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center m-4 ">
                <p className="italic text-center mb-2">
                  Sign up via developer / installer
                </p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : row['Enrolling'] === 'Yes' &&
              ![
                'Self-serve',
                'Invite only',
                'Via developer',
                'Via installer',
              ].includes(row['Self-serve']) ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center m-4 ">
                <p className="italic text-center mb-2">
                  Sign up via developer / installer
                </p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : row['Enrolling'] != 'Yes' && row['Status'] === 'Active' ? (
              <DefaultButton className="hidden sm:w-1/4 mx-4 sm:block px-4 py-1 sm:py-2 !text-main  bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none ">
                Enrollment Closed
              </DefaultButton>
            ) : row['Status'] === 'Ended' ? (
              <DefaultButton className="hidden sm:w-1/4 mx-4 sm:block px-4 py-1 sm:py-2 !text-main  bg-bgMain hover:!shadow-none hover:!bg-opacity-100  pointer-events-none ">
                Enrollment Closed
              </DefaultButton>
            ) : row['Status'] === 'Planned' ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center mx-4 ">
                <p className="italic text-center mb-2">Coming Soon</p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <div className=" flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-gray-100 overflow-hidden">
          <p className="my-8 mx-auto items-center text-center">
            No programs available
          </p>
        </div>
      )}

      <div className="text-xl pb-2 mt-8 font-black items-center  ">
        Programs you need to buy a device to be eligible for:
      </div>
      {ineligibleRows.length > 0 ? (
        ineligibleRows.map((row, index) => (
          <div
            key={index}
            className=" flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-white overflow-hidden"
          >
            <div
              className="h-auto
         flex flex-col p-4 w-1/3 sm:w-1/4 items-center align-middle "
              id="imageContainer"
            >
              <img
                className="max-h-20 max-w-20 object-contain"
                src={row['Image URL'] || '/HumEnergyLogo.svg'}
              ></img>
            </div>
            <div className="p-2 sm:p-4 w-3/4 sm:w-1/2">
              <div className="font-bold">
                {row['Program Name'] ||
                  ` ${row['Utility/CCA']} ${row['DERs needed']} Program`}
              </div>
              <div>
                Utility/CCA:{' '}
                {row['Utility/CCA'] || (
                  <span className="italic">Info Unavailable</span>
                )}
              </div>
              <div>
                Program Type:{' '}
                {row['Program Type'] || (
                  <span className="italic">Info Unavailable</span>
                )}
              </div>
              <div onClick={() => setModalVisibility(true)}>
                Eligible Manufacturers:{' '}
                <Modal
                  visible={modalVisibility}
                  onCancel={() => setModalVisibility(false)}
                  buttonText="Submit"
                  hideButton
                  className="w-screen"
                >
                  {Object.entries(row['Eligible Manufacturers']).map(
                    ([type, manufacturers]) => (
                      <div key={type}>
                        <h2 className="font-bold">{type}</h2>
                        <ul>
                          {manufacturers.map((manufacturer) => (
                            <li key={manufacturer}>{manufacturer}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </Modal>
              </div>
              <div>
                Eligible devices:{' '}
                {
                  row['DERs needed'] ? (
                    row['DERs needed']
                      .split(',') // Splitting by comma
                      .map(
                        (item) =>
                          item
                            .trim() // Trimming whitespace from each item
                            .split(' ') // Splitting each item into words
                            .map((word) => {
                              // Check for special patterns like 'A/C'
                              if (
                                word === 'A/C' ||
                                word === 'EV' ||
                                word === 'EVs'
                              ) {
                                return word; // Keep 'A/C' & EV as uppercase
                              } else {
                                // Capitalize the first letter of other words
                                return (
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                                );
                              }
                            })
                            .join(' ') // Joining the words back together
                      )
                      .sort() // Sorting alphabetically
                      .join(', ') // Joining back with comma and space
                  ) : (
                    <span className="italic">Info Unavailable</span>
                  ) // Fallback if 'DERs needed' is not available
                }
              </div>

              {row['Enrolling'] === 'Yes' &&
              row['Self-serve'] === 'Self-serve' ? (
                <DefaultButton
                  className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Sign Up
                </DefaultButton>
              ) : row['Enrolling'] === 'Yes' &&
                (row['Self-serve'] === 'Via developer' ||
                  row['Self-serve'] === 'Via installer') ? (
                <div className="sm:hidden">
                  <p className="italic mb-2 mt-2">
                    Sign up via developer / installer
                  </p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : row['Enrolling'] === 'Yes' &&
                row['Self-serve'] === 'Invite only' ? (
                <div className="sm:hidden">
                  <p className="italic mb-2 mt-2">Invite only </p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : row['Enrolling'] === 'Yes' &&
                ![
                  'Self-serve',
                  'Invite only',
                  'Via developer',
                  'Via installer',
                ].includes(row['Self-serve']) ? (
                <div className="sm:hidden">
                  <p className="italic mb-2 mt-2">
                    {`Sign up:  ${row['Self-serve']}`}
                  </p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : row['Enrolling'] != 'Yes' && row['Status'] === 'Active' ? (
                <DefaultButton className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none ">
                  Enrollment Closed
                </DefaultButton>
              ) : row['Status'] === 'Ended' ? (
                <DefaultButton className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none">
                  Enrollment Closed
                </DefaultButton>
              ) : row['Status'] === 'Planned' ? (
                <div className="sm:hidden">
                  <p className="italic mt-2 mb-2">Coming Soon</p>
                  <DefaultButton
                    className="w-auto px-2 !py-1 sm:py-2 sm:hidden"
                    onClick={() => handleSignUpClick(row['Program URL'])}
                  >
                    Learn More
                  </DefaultButton>
                </div>
              ) : null}
            </div>

            {row['Enrolling'] === 'Yes' &&
            row['Self-serve'] === 'Self-serve' ? (
              <DefaultButton
                className="hidden sm:w-1/4 mx-4 px-4 py-1 sm:py-2 sm:block"
                onClick={() => handleSignUpClick(row['Program URL'])}
              >
                Sign Up
              </DefaultButton>
            ) : row['Enrolling'] === 'Yes' &&
              (row['Self-serve'] === 'Via developer' ||
                row['Self-serve'] === 'Via installer') ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center m-4 ">
                <p className="italic text-center mb-2">
                  Sign up via developer / installer
                </p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : row['Enrolling'] === 'Yes' &&
              row['Self-serve'] === 'Invite only' ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center m-4 ">
                <p className="italic text-center mb-2">Invite only </p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : row['Enrolling'] === 'Yes' &&
              ![
                'Self-serve',
                'Invite only',
                'Via developer',
                'Via installer',
              ].includes(row['Self-serve']) ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center m-4 ">
                <p className="italic text-center mb-2">
                  {`Sign up:  ${row['Self-serve']}`}
                </p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : row['Enrolling'] != 'Yes' && row['Status'] === 'Active' ? (
              <DefaultButton className="hidden sm:w-1/4 mx-4 sm:block px-4 py-1 sm:py-2 !text-main  bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none ">
                Enrollment Closed
              </DefaultButton>
            ) : row['Status'] === 'Ended' ? (
              <DefaultButton className="hidden sm:w-1/4 mx-4 sm:block px-4 py-1 sm:py-2 !text-main  bg-bgMain hover:!shadow-none hover:!bg-opacity-100  pointer-events-none ">
                Enrollment Closed
              </DefaultButton>
            ) : row['Status'] === 'Planned' ? (
              <div className="hidden sm:w-1/4 sm:flex flex-col items-center mx-4 ">
                <p className="italic text-center mb-2">Coming Soon</p>
                <DefaultButton
                  className="hidden sm:w-full px-4 py-1 sm:py-2 sm:block"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <div className=" flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-gray-100 overflow-hidden">
          <p className="my-8 mx-auto items-center text-center">
            No programs available
          </p>
        </div>
      )}
    </div>
  );
}

export default ProgramFinderOutput;
