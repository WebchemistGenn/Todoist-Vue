import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  const testData = [
    { id: 0, context: "등산하기", createdAt: 1550984912840, completedAt: 1550984934549 },
    { id: 1, context: "축구하기", createdAt: 1550984912840, completedAt: null },
    { id: 2, context: "Vue 스터디 참여", createdAt: 1550984912840, completedAt: null },
  ];

  const HomeView = mount(Home);
  HomeView.setData({ list: testData });
  HomeView.setData({ active: "All" });

  it("렌더 성공", () => {
    expect(HomeView.contains("div.Home")).toBe(true);
  });

  it("데이터가 정상적으로 화면에 출력되어야합니다. (All)", () => {
    HomeView.setData({ active: "All" });
    expect(HomeView.vm.$data.active).toBe("All");
    expect(HomeView.findAll("li.item").length).toBe(testData.length);
  });

  it("데이터가 정상적으로 화면에 출력되어야합니다. (Active)", () => {
    HomeView.setData({ active: "Active" });
    expect(HomeView.vm.$data.active).toBe("Active");
    expect(HomeView.findAll("li.item").length).toBe(testData.filter(item => item.completedAt === null).length);
  });

  it("데이터가 정상적으로 화면에 출력되어야합니다. (Completed)", () => {
    HomeView.setData({ active: "Completed" });
    expect(HomeView.vm.$data.active).toBe("Completed");
    expect(HomeView.findAll("li.item").length).toBe(testData.filter(item => item.completedAt !== null).length);
  });

  it("데이터 입력시 정상 입력되어야 합니다.", () => {
    HomeView.setData({ form: { context: "산책하기.", createdAt: new Date().getTime(), completedAt: null } });
    // expect(wrapper.text()).toMatch(msg);
  });

  it("데이터 삭제시 정상 삭제되어야 합니다.", () => {
    // expect(wrapper.text()).toMatch(msg);
  });

  it("데이터 전체 삭제시 정상 전체삭제되어야 합니다.", () => {
    // expect(wrapper.text()).toMatch(msg);
  });
});
