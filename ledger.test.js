import { equal } from 'assert';
import { ledger } from './ledger';
describe('ledger(input)', function () {
    it('should return correct output when the for given input', function () {
        const input = [
            'LOAN IDIDI Dale 5000 1 6',
            'LOAN MBI Harry 10000 3 7',
            'LOAN UON Shelly 15000 2 9',
            'PAYMENT IDIDI Dale 1000 5',
            'PAYMENT MBI Harry 5000 10',
            'PAYMENT UON Shelly 7000 12',
            'BALANCE IDIDI Dale 3',
            'BALANCE IDIDI Dale 6',
            'BALANCE UON Shelly 12',
            'BALANCE MBI Harry 12'
          ];
          const output =  [
            'IDIDI, Dale, 1326, 9',
            'IDIDI, Dale, 3652, 4',
            'UON, Shelly, 15856, 3',
            'MBI, Harry, 9044, 10'
          ]
      equal(ledger(input), output);
    });
});