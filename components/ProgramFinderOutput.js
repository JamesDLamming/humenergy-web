import React, { useState } from 'react';
import DefaultButton from './DefaultButton';
import Modal from './Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReactGA from 'react-ga';

function ProgramFinderOutput({ data, visible }) {
  const eligibleRows = data.filter((row) => row.tag === 'Eligible');
  const ineligibleRows = data.filter(
    (row) => row.tag === 'Ineligible' || row['New Customers Only'] === 'Yes'
  );
  const [modalVisibility, setModalVisibility] = useState(false);

  const [currentRowData, setCurrentRowData] = useState(null); // State to hold current row data for the modal
  const [currentRow, setCurrentRow] = useState(null);

  // Function to open modal with specific row data
  const openModalWithRowData = (rowData) => {
    setCurrentRowData(rowData);
    setCurrentRow(rowData);
    setTimeout(() => {
      setModalVisibility(true);
    }, 250);
  };

  const closeModal = () => {
    setModalVisibility(false);

    // Check if currentRow is not null
    if (currentRow !== null) {
      setModalOpenState((prev) => ({
        ...prev,
        [currentRow]: false, // Set the modal open state of the current row to false
      }));
    }
  };

  const [sectionOpenState, setSectionOpenState] = useState({});
  const [modalOpenState, setModalOpenState] = useState({});

  const toggleSection = (type) => {
    setSectionOpenState((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleModal = (row) => {
    setModalOpenState((prev) => ({
      ...prev,
      [row]: !prev[row],
    }));
  };

  const handleSignUpClick = (event, url, programName) => {
    const buttonText = event.target.textContent || event.target.innerText;

    ReactGA.event({
      category: 'User Interaction',
      action: `Clicked ${buttonText}`,
      label: `Program: ${programName}`,
    });

    window.open(url, '_blank').focus();
  };

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

  return (
    <div className="w-full ">
      <Modal
        visible={modalVisibility}
        onCancel={() => closeModal()}
        buttonText="Submit"
        hideButton
      >
        {currentRowData && (
          <>
            <div
              className="h-auto flex flex-col p-4 items-center align-middle"
              id="imageContainer"
            >
              <img
                className="max-h-20 max-w-20 object-contain"
                src={currentRowData['Image URL'] || '/HumEnergyLogo.svg'}
              ></img>
            </div>
            <div className="font-bold text-center font-inter  text-xl">
              {currentRowData['Program Name'] ||
                ` ${currentRowData['Utility/CCA']} ${currentRowData['DERs needed']} Program`}
            </div>
            <p className="mt-4  font-bold text-lg">
              Eligible Devices & Manufacturers
            </p>

            <div className="mb-2">
              {Object.entries(currentRowData['Eligible Manufacturers']).map(
                ([type, manufacturers]) => (
                  <div key={type}>
                    <div
                      className="flex gap-x-0 items-center mt-2 cursor-pointer"
                      onClick={() => toggleSection(type)}
                    >
                      <p className="font-semibold">
                        {type
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
                          .join(' ')}
                      </p>
                      {/* Arrow Icon logic based on sectionOpenState */}
                      <svg
                        className={`fill-current h-6 w-6 transform toggleIcon ${
                          sectionOpenState[type] ? '' : '-rotate-90'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.516 7.548c.436-.446 1.045-.481 1.576 0L10 10.405l2.908-2.857c.531-.481 1.141-.446 1.576 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.631.408-.997.408s-.728-.141-.997-.408l-3.417-3.356c-.408-.445-.436-1.197 0-1.642z" />
                      </svg>
                    </div>
                    <div
                      className={`Section ${
                        sectionOpenState[type] ? 'openToggle' : 'closed'
                      }`}
                    >
                      <div>
                        <ul>
                          {manufacturers.map((manufacturer) => (
                            <li key={manufacturer}>{manufacturer}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {currentRowData['Enrolling'] === 'Yes' &&
            currentRowData['Self-serve'] === 'Self-serve' ? (
              <DefaultButton
                className="w-full px-2 !py-1 sm:py-2 mt-2 "
                onClick={(e) =>
                  handleSignUpClick(
                    e,
                    currentRowData['Program URL'],
                    currentRowData['Program Name']
                  )
                }
              >
                Sign Up
              </DefaultButton>
            ) : currentRowData['Enrolling'] === 'Yes' &&
              (currentRowData['Self-serve'] === 'Via developer' ||
                currentRowData['Self-serve'] === 'Via installer') ? (
              <div className="">
                <p className="italic mb-2 mt-4 text-center">
                  Sign up via developer / installer
                </p>
                <DefaultButton
                  className="w-full px-2 !py-1 sm:py-2 "
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      currentRowData['Program URL'],
                      currentRowData['Program Name']
                    )
                  }
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : currentRowData['Enrolling'] === 'Yes' &&
              currentRowData['Self-serve'] === 'Invite only' ? (
              <div className="">
                <p className="italic mb-2 mt-4  text-center">Invite only </p>
                <DefaultButton
                  className="w-full px-2 !py-1 sm:py-2 "
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      currentRowData['Program URL'],
                      currentRowData['Program Name']
                    )
                  }
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : currentRowData['Enrolling'] === 'Yes' &&
              ![
                'Self-serve',
                'Invite only',
                'Via developer',
                'Via installer',
              ].includes(currentRowData['Self-serve']) ? (
              <div className="">
                <p className="italic mb-2 mt-4  text-center">
                  {`Sign up:  ${currentRowData['Self-serve']}`}
                </p>
                <DefaultButton
                  className="w-full px-2 !py-1 sm:py-2 "
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      currentRowData['Program URL'],
                      currentRowData['Program Name']
                    )
                  }
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : currentRowData['Enrolling'] != 'Yes' &&
              currentRowData['Status'] === 'Active' ? (
              <DefaultButton className="w-full px-2 !py-1 sm:py-2 mt-2  !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none ">
                Enrollment Closed
              </DefaultButton>
            ) : currentRowData['Status'] === 'Ended' ? (
              <DefaultButton className="w-full px-2 !py-1 sm:py-2 mt-2  !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none">
                Enrollment Closed
              </DefaultButton>
            ) : currentRowData['Status'] === 'Planned' ? (
              <div className="">
                <p className="italic mt-4 mb-2  text-center">Coming Soon</p>
                <DefaultButton
                  className="w-full px-2 !py-1 sm:py-2 "
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      currentRowData['Program URL'],
                      currentRowData['Program Name']
                    )
                  }
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : null}
          </>
        )}
      </Modal>

      <style>{`.Section {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.7s ease, margin 0.7s ease;}
        .openToggle {
          grid-template-rows: 1fr;
          margin-bottom: 0.5rem;
        }
        .closed {
          overflow: hidden;
        }
        .Section > div {
          overflow:hidden
        }
        .toggleIcon {
          transition: all 0.7s ease-out
        }

        .modalIcon {
          transition: all 0.2s ease-out
        }
      `}</style>

      <div className="text-xl pb-2 mt-8 font-black items-center  ">
        Programs you may be eligible for:
      </div>
      {eligibleRows.length > 0 ? (
        eligibleRows.map(
          (row, index) =>
            row['New Customers Only'] != 'Yes' && (
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
                  <div className="font-extrabold font-inter">
                    {row['Program Name'] ||
                      ` ${row['Utility/CCA']} ${row['DERs needed']} Program`}
                  </div>
                  <div>
                    <span className="font-bold">Utility/CCA: </span>
                    {row['Utility/CCA'] || (
                      <span className="italic">Info Unavailable</span>
                    )}
                  </div>
                  <div>
                    <span className="font-bold">Program Type: </span>
                    {row['Program Type'] || (
                      <span className="italic">Info Unavailable</span>
                    )}
                  </div>
                  <div>
                    <span className="font-bold">Eligible devices types: </span>
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
                  <div
                    onClick={() => {
                      openModalWithRowData(row), toggleModal(row);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="align-middle">
                      See eligible devices & manufacturers{' '}
                    </span>
                    <AddCircleOutlineIcon
                      fontSize=""
                      className={`ml-1 items-center transform modalIcon ${
                        modalOpenState[row] ? '' : '-rotate-90'
                      }  `}
                    />
                  </div>

                  {row['Enrolling'] === 'Yes' &&
                  row['Self-serve'] === 'Self-serve' ? (
                    <DefaultButton
                      className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden"
                      onClick={(e) =>
                        handleSignUpClick(
                          e,
                          row['Program URL'],
                          row['Program Name']
                        )
                      }
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
                        onClick={(e) =>
                          handleSignUpClick(
                            e,
                            row['Program URL'],
                            row['Program Name']
                          )
                        }
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
                        onClick={(e) =>
                          handleSignUpClick(
                            e,
                            row['Program URL'],
                            row['Program Name']
                          )
                        }
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
                        onClick={(e) =>
                          handleSignUpClick(
                            e,
                            row['Program URL'],
                            row['Program Name']
                          )
                        }
                      >
                        Learn More
                      </DefaultButton>
                    </div>
                  ) : row['Enrolling'] != 'Yes' &&
                    row['Status'] === 'Active' ? (
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
                        onClick={(e) =>
                          handleSignUpClick(
                            e,
                            row['Program URL'],
                            row['Program Name']
                          )
                        }
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
                    onClick={(e) =>
                      handleSignUpClick(
                        e,
                        row['Program URL'],
                        row['Program Name']
                      )
                    }
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
                      onClick={(e) =>
                        handleSignUpClick(
                          e,
                          row['Program URL'],
                          row['Program Name']
                        )
                      }
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
                      onClick={(e) =>
                        handleSignUpClick(
                          e,
                          row['Program URL'],
                          row['Program Name']
                        )
                      }
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
                      onClick={(e) =>
                        handleSignUpClick(
                          e,
                          row['Program URL'],
                          row['Program Name']
                        )
                      }
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
                      onClick={(e) =>
                        handleSignUpClick(
                          e,
                          row['Program URL'],
                          row['Program Name']
                        )
                      }
                    >
                      Learn More
                    </DefaultButton>
                  </div>
                ) : null}
              </div>
            )
        )
      ) : (
        <div className=" flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-gray-100 overflow-hidden">
          <p className="my-8 mx-auto items-center text-center">
            No programs available
          </p>
        </div>
      )}

      <div className="text-xl pb-2 mt-8 font-black items-center  ">
        Programs you may need to buy a device to be eligible for:
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
              <div className="font-extrabold font-inter">
                {row['Program Name'] ||
                  ` ${row['Utility/CCA']} ${row['DERs needed']} Program`}
              </div>
              <div>
                <span className="font-bold">Utility/CCA: </span>
                {row['Utility/CCA'] || (
                  <span className="italic">Info Unavailable</span>
                )}
              </div>
              <div>
                <span className="font-bold">Program Type: </span>
                {row['Program Type'] || (
                  <span className="italic">Info Unavailable</span>
                )}
              </div>
              <div>
                <span className="font-bold">Eligible devices types: </span>
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
              <div
                onClick={() => {
                  openModalWithRowData(row), toggleModal(row);
                }}
                className="cursor-pointer"
              >
                <span className="align-middle">
                  See eligible devices & manufacturers{' '}
                </span>
                <AddCircleOutlineIcon
                  fontSize=""
                  className={`ml-1 items-center transform modalIcon ${
                    modalOpenState[row] ? '' : '-rotate-90'
                  }  `}
                />
              </div>
              <div>
                {row['New Customers Only'] === 'Yes' && (
                  <span className="italic font-semibold">
                    *New installations only
                  </span>
                )}
              </div>

              {row['Enrolling'] === 'Yes' &&
              row['Self-serve'] === 'Self-serve' ? (
                <DefaultButton
                  className="w-auto px-2 !py-1 sm:py-2 mt-2 sm:hidden"
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      row['Program URL'],
                      row['Program Name']
                    )
                  }
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
                    onClick={(e) =>
                      handleSignUpClick(
                        e,
                        row['Program URL'],
                        row['Program Name']
                      )
                    }
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
                    onClick={(e) =>
                      handleSignUpClick(
                        e,
                        row['Program URL'],
                        row['Program Name']
                      )
                    }
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
                    onClick={(e) =>
                      handleSignUpClick(
                        e,
                        row['Program URL'],
                        row['Program Name']
                      )
                    }
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
                    onClick={(e) =>
                      handleSignUpClick(
                        e,
                        row['Program URL'],
                        row['Program Name']
                      )
                    }
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
                onClick={(e) =>
                  handleSignUpClick(e, row['Program URL'], row['Program Name'])
                }
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
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      row['Program URL'],
                      row['Program Name']
                    )
                  }
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
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      row['Program URL'],
                      row['Program Name']
                    )
                  }
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
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      row['Program URL'],
                      row['Program Name']
                    )
                  }
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
                  onClick={(e) =>
                    handleSignUpClick(
                      e,
                      row['Program URL'],
                      row['Program Name']
                    )
                  }
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
