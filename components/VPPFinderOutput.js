import React from 'react';
import DefaultButton from './DefaultButton';

function VPPFinderOutput({ data, visible }) {
  if (!visible) {
    return null;
  }
  if (!data || data.length === 0) {
    return <p>No programs available</p>;
  }

  const handleSignUpClick = (url) => {
    window.location.href = url; // This will navigate to the specified URL
  };
  return (
    <div className="">
      {data.map((row, index) => (
        <div
          key={index}
          className="flex max-w-7xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl text-sm sm:text-base items-center  p-0    shadow-sm rounded-lg h-auto mb-4 bg-white overflow-hidden"
        >
          <div
            className="h-auto
           flex flex-col p-2 w-1/4 items-center align-middle "
            id="imageContainer"
          >
            <img
              className="items-center align-middle h-full  max-h-20 max-w-20 p-2"
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
              Eligible assets:{' '}
              {row['DERs needed'] || (
                <span className="italic">Info Unavailable</span>
              )}
            </div>

            {row['Enrollment'] === 'Yes' ? (
              <DefaultButton
                className="w-auto px-2 py-0 mt-2 sm:hidden"
                onClick={() => handleSignUpClick(row['Program URL'])}
              >
                Sign Up
              </DefaultButton>
            ) : row['Enrollment'] != 'Yes' && row['Status'] === 'Active' ? (
              <DefaultButton className="w-auto px-2 py-0 mt-2 sm:hidden !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100">
                Enrollment Closed
              </DefaultButton>
            ) : row['Status'] === 'Ended' ? (
              <DefaultButton className="w-auto px-2 py-0 mt-2 sm:hidden !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 !pointer-events-none">
                Enrollment Closed
              </DefaultButton>
            ) : row['Status'] === 'Planned' ? (
              <div className="sm:hidden mt-2">
                <p className="italic">Coming Soon</p>
                <DefaultButton
                  className="w-auto px-2 py-0 sm:hidden"
                  onClick={() => handleSignUpClick(row['Program URL'])}
                >
                  Learn More
                </DefaultButton>
              </div>
            ) : null}
          </div>

          {row['Enrollment'] === 'Yes' ? (
            <DefaultButton
              className="hidden sm:w-1/4 mx-4 px-4 py-2 sm:block"
              onClick={() => handleSignUpClick(row['Program URL'])}
            >
              Sign Up
            </DefaultButton>
          ) : row['Enrollment'] != 'Yes' && row['Status'] === 'Active' ? (
            <DefaultButton className="hidden sm:w-1/4 mx-4 sm:block px-4 py-2 !text-main  bg-bgMain hover:!shadow-none hover:!bg-opacity-100  ">
              Enrollment Closed
            </DefaultButton>
          ) : row['Status'] === 'Ended' ? (
            <DefaultButton className="hidden sm:w-1/4 mx-4 sm:block px-4 py-2 !text-main  bg-bgMain hover:!shadow-none hover:!bg-opacity-100  ">
              Enrollment Closed
            </DefaultButton>
          ) : row['Status'] === 'Planned' ? (
            <div className="hidden sm:w-1/4 sm:flex flex-col items-center mx-4 ">
              <p className="italic">Coming Soon</p>
              <DefaultButton
                className="hidden sm:w-full px-4 py-2 sm:block"
                onClick={() => handleSignUpClick(row['Program URL'])}
              >
                Learn More
              </DefaultButton>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default VPPFinderOutput;
