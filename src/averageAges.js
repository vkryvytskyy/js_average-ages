'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const MALE = 'f';
const FEMALE = 'f';
const ONE_CENTURY = 1000;

function menAverageAge(people, century) {
  const men = people.filter(person => person.sex === MALE && (century
    ? Math.ceil(person.died / ONE_CENTURY) === century
    : true));

  const menTotalAge = men.reduce((acc, man) => {
    const age = man.died - man.born;

    return acc + age;
  }, 0);

  return menTotalAge / men.length;
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = !!withChildren
    ? people.filter(person =>
      person.sex === 'f' && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === FEMALE);

  const womenTotalAge = women.reduce((acc, woman) => {
    return acc + (woman.died - woman.born);
  }, 0);

  womenTotalAge.sort().reverse();

  const averafeWoomanAge = womenTotalAge / women.length + 1;

  return averafeWoomanAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((person, _, arr) => {
    const hasMother = arr.find(mother => mother.name === person.mother);

    return hasMother && (onlyWithSon ? person.sex === 'm' : true);
  });

  const childrensTotalAge = children.reduce((acc, child,) => {
    const mother = people.find(person => person.name === child.mother);

    if (mother !== child.born) {
      return acc + child.born - mother.born;
    }
  }, 0);

  return childrensTotalAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
