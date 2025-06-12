const subjectData = {
  3: {
    heading: 'CSE Year 2 Semester 3 Subjects',
    subjects: {
      maths: 'Engineering Mathematics - III-C',
      dsl: 'Discrete Structures and Logic',
      ppl: 'Principles of Programming Language',
      dsa: 'Data Structure and Algorithms',
      scld: 'Switching Circuits and Logic Design',
      dsalab: 'Data Structure and Algorithms Lab',
      ntl: 'Numerical Techniques Lab'
    }
  },
  4: {
    heading: 'CSE Year 2 Semester 4 Subjects',
    subjects: {
      maths: 'Engineering Mathematics - III-C',
      dsl: 'Discrete Structures and Logic',
      ppl: 'Principles of Programming Language',
      dsa: 'Data Structure and Algorithms',
      scld: 'Switching Circuits and Logic Design',
      dsalab: 'Data Structure and Algorithms Lab',
      ntl: 'Numerical Techniques Lab'
    }
  }
};

function updateSubjects() {
  const semester = document.getElementById('semesterSelect').value;
  const subjectList = document.getElementById('subjectList');
  const subjectHeading = document.getElementById('subjectHeading');
  const data = subjectData[semester];
  subjectHeading.textContent = data.heading;

  subjectList.innerHTML = '';
  Object.keys(data.subjects).forEach(key => {
    const li = document.createElement('li');
    li.textContent = data.subjects[key];
    li.className = 'bg-gray-700 p-3 rounded cursor-pointer';
    li.onclick = () => showSubject(key, semester);
    subjectList.appendChild(li);
  });
}

function createChapterBox(index) {
  return `
    <div class="bg-gray-700 p-4 rounded mb-4">
      <label class="flex items-start space-x-4">
        <input type="checkbox" class="mt-1 chapter-checkbox">
        <div>
          <strong>Chapter ${index + 1}: Dummy Chapter Title</strong>
          <p class="text-sm mt-1">This chapter covers some important syllabus topics related to this subject.</p>
        </div>
      </label>
    </div>
  `;
}

function showSubject(key, semester) {
  const container = document.getElementById('subjectContents');
  const subjectName = subjectData[semester].subjects[key];
  const chapters = Array.from({ length: 6 }, (_, i) => createChapterBox(i)).join('');
  container.innerHTML = `
    <h2 class="text-xl font-bold mb-4">${subjectName}</h2>
    <div class="bg-gray-700 h-3 rounded mb-4">
      <div id="progress-${key}" class="bg-blue-600 h-3 rounded" style="width: 0%"></div>
    </div>
    <div id="chapters-${key}">
      ${chapters}
    </div>
  `;
  updateCheckboxes(key);
}

function updateCheckboxes(key) {
  const checkboxes = document.querySelectorAll(`#chapters-${key} .chapter-checkbox`);
  const progressBar = document.getElementById(`progress-${key}`);
  const popup = document.getElementById('completionPopup');

  checkboxes.forEach(cb => cb.addEventListener('change', () => {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.floor((checked / total) * 100);
    progressBar.style.width = percent + '%';

    if (percent === 100) {
      popup.classList.add('opacity-100');
      popup.classList.remove('opacity-0');
      setTimeout(() => {
        popup.classList.remove('opacity-100');
        popup.classList.add('opacity-0');
      }, 3000);
    }
  }));
}

// Initialize default view
updateSubjects();
