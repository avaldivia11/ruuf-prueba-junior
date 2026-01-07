import * as fs from 'fs'

interface TestCase {
  panelW: number
  panelH: number
  roofW: number
  roofH: number
  expected: number
}

interface TestData {
  testCases: TestCase[]
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  // Implementa acá tu solución

  // sin rotar el techo
  const initialPanel =
    Math.floor(roofWidth / panelWidth) * Math.floor(roofHeight / panelHeight)

  // rotando el techo
  const rotatedPanel =
    Math.floor(roofWidth / panelHeight) * Math.floor(roofHeight / panelWidth)

  let maxPanels = Math.max(initialPanel, rotatedPanel)

  // dividiendo verticalmente el techo

  for (let w = 0; w <= roofWidth; w++) {
    const leftPanels =
      Math.floor(w / panelWidth) * Math.floor(roofHeight / panelHeight)

    const rightPanels =
      Math.floor((roofWidth - w) / panelHeight) *
      Math.floor(roofHeight / panelWidth)

    maxPanels = Math.max(maxPanels, leftPanels + rightPanels)
  }

  // dividiendo horizontalmente el techo

  for (let h = 0; h <= roofHeight; h++) {
    const topPanels =
      Math.floor(roofWidth / panelWidth) * Math.floor(h / panelHeight)

    const bottomPanels =
      Math.floor(roofWidth / panelHeight) *
      Math.floor((roofHeight - h) / panelWidth)

    maxPanels = Math.max(maxPanels, topPanels + bottomPanels)
  }

  return maxPanels
}

function main(): void {
  console.log('🐕 Wuuf wuuf wuuf 🐕')
  console.log('================================\n')

  runTests()
}

function runTests(): void {
  const data: TestData = JSON.parse(fs.readFileSync('test_cases.json', 'utf-8'))
  const testCases = data.testCases

  console.log('Corriendo tests:')
  console.log('-------------------')

  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(
      test.panelW,
      test.panelH,
      test.roofW,
      test.roofH
    )
    const passed = result === test.expected

    console.log(`Test ${index + 1}:`)
    console.log(
      `  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`
    )
    console.log(`  Expected: ${test.expected}, Got: ${result}`)
    console.log(`  Status: ${passed ? '✅ PASSED' : '❌ FAILED'}\n`)
  })
}

main()
