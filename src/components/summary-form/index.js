import '../date-dropdown/index';
import '../guests-dropdown/index';
import SummaryForm from './SummaryForm';

document.querySelectorAll('.js-summary-form').forEach((summaryForm) => {
  const summaryFormDOM = summaryForm;
  summaryFormDOM.summaryForm = new SummaryForm(summaryForm);
});
