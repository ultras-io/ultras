import React, { useMemo, useState, useCallback, MouseEvent } from 'react';
import tests from './tests';

function App() {
  const testNames = useMemo(() => Object.keys(tests), []);
  const [running, setRunning] = useState<boolean>(false);

  const onRunClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    const testName = button.dataset.testName as keyof typeof tests;
    const testFunction = tests[testName];

    if ('function' == typeof testFunction) {
      setRunning(true);
      await testFunction();
      setRunning(false);
    }
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Test name</th>
            <th>Run</th>
          </tr>
        </thead>
        <tbody>
          {testNames.map((testName: string) => (
            <tr key={`test-${testName}`}>
              <td>{testName}</td>
              <td>
                <button data-test-name={testName} disabled={running} onClick={onRunClick}>
                  Run test
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Run test and open console to see test results.</p>
    </div>
  );
}

export default App;
